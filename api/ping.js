export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    node: process.version,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
}
