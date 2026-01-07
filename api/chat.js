import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [], system = "" } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY not configured",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try 2.5 models first, then 2.0 - NO 1.5 models
    const modelCandidates = [
      process.env.GEMINI_MODEL,
      "gemini-2.5-flash",
      "gemini-2.5-flash-002",
      "gemini-2.0-flash-latest",
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
    ].filter(Boolean);

    // Filter messages
    const allMessages = messages.filter((msg) => msg.role === "user" || msg.role === "assistant");
    const lastUserIndex = allMessages.map((m, i) => ({ msg: m, index: i }))
      .filter(({ msg }) => msg.role === "user")
      .pop()?.index;

    if (lastUserIndex === undefined) {
      return res.status(400).json({ error: "No user message found" });
    }

    const lastUserMessage = allMessages[lastUserIndex];
    const historyMessages = allMessages.slice(0, lastUserIndex);

    // Remove leading assistant messages
    let validHistory = [...historyMessages];
    while (validHistory.length > 0 && validHistory[0].role === "assistant") {
      validHistory = validHistory.slice(1);
    }

    const geminiHistory = validHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    let result;
    let usedModel = "";
    let lastError = null;

    for (const candidate of modelCandidates) {
      try {
        const modelConfig = { model: candidate };
        if (system && system.trim()) {
          modelConfig.systemInstruction = system;
        }

        const model = genAI.getGenerativeModel(modelConfig);

        if (geminiHistory.length > 0 && geminiHistory[0].role === "user") {
          const chat = model.startChat({ history: geminiHistory });
          result = await chat.sendMessage(lastUserMessage.content);
        } else {
          result = await model.generateContent(lastUserMessage.content);
        }

        const response = await result.response;
        usedModel = candidate;
        
        return res.status(200).json({
          reply: response.text() || "",
          text: response.text() || "",
          model: usedModel,
        });
      } catch (err) {
        lastError = err;
        console.error(`Model ${candidate} failed:`, err?.message || err);
        continue;
      }
    }

    return res.status(500).json({
      error: "Gemini API error",
      details: String(lastError?.message || lastError || "All model attempts failed"),
    });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({
      error: "Gemini API error",
      details: String(err.message || err),
    });
  }
}
