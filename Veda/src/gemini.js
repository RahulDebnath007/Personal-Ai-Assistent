import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

// ============================================================
// GEMINI API KEY
// ============================================================
console.log("🔥 NEW GEMINI.JS IS LOADED");
const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_GEMINI_API_KEY is missing from .env"
  );
}

// ============================================================
// GEMINI
// ============================================================

const genAI =
  new GoogleGenerativeAI(apiKey);

const model =
  genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
  });

// ============================================================
// GENERATION CONFIG
// ============================================================

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2030,
  responseMimeType: "text/plain",
};

// ============================================================
// RUN GEMINI
// ============================================================

async function run(prompt) {

  if (!prompt || !prompt.trim()) {
    return "Please tell me what you need.";
  }

  try {

    const chatSession =
      model.startChat({
        generationConfig,
        history: [],
      });

    const result =
      await chatSession.sendMessage(
        prompt
      );

    const text =
      result?.response?.text?.();

    if (!text) {
      return "I could not generate a response.";
    }

    return text;

  } catch (error) {

    console.error(
      "Gemini API Error:",
      error
    );

    if (
      error?.message?.includes("429")
    ) {
      return "Gemini API quota has been exceeded. Please check your API quota.";
    }

    if (
      error?.message?.includes("API_KEY_INVALID")
    ) {
      return "The Gemini API key is invalid. Please check your .env file.";
    }

    return "Sorry, I could not connect to Gemini.";
  }
}

export default run;