// gemini.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDe3ZwI6df7UTSUZ2fGJ5Uf8v_1q6nXgVU", 
});

async function runChat(prompt) {
  try {
   
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Simple string is sufficient for text prompts in the new SDK
      contents: prompt, 
    });

    return response.text;
  } catch (error) {
    console.error("An error occurred during chat:", error);
    throw error;
  }
}

export default runChat;