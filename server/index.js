import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables - check multiple locations
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Priority order: server/.env.local > server/.env > root/.env.local > root/.env
const envFiles = [
  join(__dirname, ".env.local"),
  join(__dirname, ".env"),
  join(__dirname, "..", ".env.local"),
  join(__dirname, "..", ".env"),
];

for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile });
    console.log(`✓ Loaded environment from: ${envFile}`);
  }
}

// Debug: Log if API key is found (but not the actual key)
console.log(`GEMINI_API_KEY configured: ${process.env.GEMINI_API_KEY ? 'YES (hidden)' : 'NO'}`);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [], system = "" } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment variables");
      console.error("Checked locations:", envFiles);
      return res.status(500).json({
        error: "GEMINI_API_KEY not configured. Please check your .env or .env.local file.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Build model preference list (override with GEMINI_MODEL if provided)
    // Only 2.5 and 2.0 models - removed 1.5 models as they're not supported
    const modelCandidates = Array.from(
      new Set(
        [
          process.env.GEMINI_MODEL,
          // 2.5 models first (if your key supports them)
          "gemini-2.5-flash",
          "gemini-2.5-flash-002",
          // 2.0 models as fallback
          "gemini-2.0-flash-latest",
          "gemini-2.0-flash",
          "gemini-2.0-flash-exp",
          "gemini-2.0-flash-thinking-exp-001",
        ].filter(Boolean)
      )
    );
    
    console.log(`Trying models in order: ${modelCandidates.join(", ")}`);

    // Filter and validate messages
    const allMessages = messages.filter((msg) => msg.role === "user" || msg.role === "assistant");
    
    // Find the last user message
    const lastUserMessageIndex = allMessages.map((m, i) => ({ msg: m, index: i }))
      .filter(({ msg }) => msg.role === "user")
      .pop()?.index;
    
    if (lastUserMessageIndex === undefined) {
      return res.status(400).json({
        error: "No user message found",
      });
    }
    
    const lastUserMessage = allMessages[lastUserMessageIndex];
    const historyMessages = allMessages.slice(0, lastUserMessageIndex);
    
    // Ensure history starts with a user message (remove any leading assistant messages)
    let validHistory = [...historyMessages];
    while (validHistory.length > 0 && validHistory[0].role === "assistant") {
      validHistory = validHistory.slice(1);
    }
    
    // Convert to Gemini format - ensure alternating pattern
    const geminiHistory = validHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));
    
    let result;
    
    // Try each model until one succeeds
    let text = "";
    let usedModel = "";
    let lastError = null;

    for (const candidate of modelCandidates) {
      try {
        console.log(`Attempting Gemini model: ${candidate}`);

        const modelConfig = { model: candidate };
        if (system && system.trim()) {
          modelConfig.systemInstruction = system;
        }

        const model = genAI.getGenerativeModel(modelConfig);

        if (geminiHistory.length > 0 && geminiHistory[0].role === "user") {
          const chat = model.startChat({
            history: geminiHistory,
          });
          const result = await chat.sendMessage(lastUserMessage.content);
          const response = await result.response;
          text = response.text() || "";
        } else {
          const result = await model.generateContent(lastUserMessage.content);
          const response = await result.response;
          text = response.text() || "";
        }

        usedModel = candidate;
        break; // success
      } catch (err) {
        lastError = err;
        console.error(`Model ${candidate} failed:`, err?.message || err);
        continue;
      }
    }

    if (!usedModel) {
      console.error("All model attempts failed.");
      if (lastError) {
        console.error("Last error:", lastError?.message || lastError);
      }
      return res.status(500).json({
        error: "Gemini API error",
        details: String(lastError?.message || lastError || "All model attempts failed."),
      });
    }

    return res.json({ text: text, reply: text, model: usedModel });

  } catch (err) {
    console.error("Gemini error:", err);
    console.error("Error details:", err.message);
    if (err.stack) {
      console.error("Stack:", err.stack);
    }
    return res.status(500).json({
      error: "Gemini API error",
      details: String(err.message || err),
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));