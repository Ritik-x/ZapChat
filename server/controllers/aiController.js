// aiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load the specific model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const translateToGoodEnglish = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "text is required",
      });
    }

    // Prepare prompt
    const prompt = `Convert the following text into fluent, correct English without changing its meaning:
"${text}"`;

    // Send request to Gemini
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    res.status(200).json({
      success: true,
      improvedText: aiResponse,
    });
  } catch (error) {
    console.error("AI Translation Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while translating text",
    });
  }
};
