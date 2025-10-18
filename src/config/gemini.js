import { GoogleGenAI } from "@google/genai";

// ⚠️ DANGER: Hardcoding the key is not recommended for production!
const apiKey = "AIzaSyDe3ZwI6df7UTSUZ2fGJ5Uf8v_1q6nXgVU"; 

// Pass the API key explicitly
const ai = new GoogleGenAI({ apiKey }); 

async function runChat(prompt) {
  try {
    const response = await ai.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("An error occurred during chat:", error);
    throw error;
  }
}

export default runChat;