
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getServiceRecommendation(userInput: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User asks: "${userInput}". 
        Given our salon services: ${SERVICES.map(s => `${s.name}: ${s.description}`).join(', ')}.
        Recommend the top 1-2 services that fit their need. Explain why in a friendly, encouraging tone.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    serviceName: { type: Type.STRING },
                    reasoning: { type: Type.STRING }
                  },
                  required: ["serviceName", "reasoning"]
                }
              },
              friendlyMessage: { type: Type.STRING }
            },
            required: ["recommendations", "friendlyMessage"]
          }
        }
      });
      
      return JSON.parse(response.text);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      return {
        friendlyMessage: "I'd love to help! Based on your request, I recommend chatting with one of our specialists. How about a haircut or a revitalizing facial?",
        recommendations: []
      };
    }
  }
};
