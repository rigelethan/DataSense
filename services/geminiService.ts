import { GoogleGenAI, Type } from "@google/genai";
import { CalculationResult, GeminiAnalysisResult } from "../types";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeDataUsage = async (
  data: CalculationResult
): Promise<GeminiAnalysisResult> => {
  const ai = getGeminiClient();
  
  // Format the breakdown for the prompt
  const breakdownStr = data.breakdown
    .map((b) => `${b.name}: ${b.value.toFixed(2)} GB`)
    .join(", ");

  const prompt = `
    Analyze the following monthly data usage profile:
    Total Usage: ${data.totalMonthlyGB.toFixed(2)} GB
    Breakdown: ${breakdownStr}

    The user wants to know what percentile of internet users they fall into (assume a global average of heavy users is ~300GB, average is ~100GB, light is <20GB). 
    
    Provide a JSON response with:
    1. 'percentile': A number between 0 and 100 representing their percentile (higher is more usage).
    2. 'reductionStrategies': An array of 3-4 specific, high-impact actionable strategies to reduce their energy and data usage based on their specific top consumers (e.g. if Video is high, suggest SD resolution; if AI is high, suggest batching prompts).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            percentile: { type: Type.NUMBER },
            reductionStrategies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["percentile", "reductionStrategies"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeminiAnalysisResult;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback if API fails
    return {
      percentile: Math.min(Math.round((data.totalMonthlyGB / 600) * 100), 99),
      reductionStrategies: [
        "Lower video streaming quality from 4K/HD to Standard Definition.",
        "Download music and podcasts over Wi-Fi for offline listening.",
        "Disable auto-play on social media platforms like Instagram and TikTok."
      ],
    };
  }
};