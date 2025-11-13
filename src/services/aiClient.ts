import { sanitizeSuggestion } from "@/lib/utils";
import axios, { type AxiosInstance, type AxiosError } from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY ?? "";

// Create axios instance with default configuration
const openAIClient: AxiosInstance = axios.create({
    baseURL: "https://api.openai.com/v1",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - add authorization header
openAIClient.interceptors.request.use(
    (config) => {
        if (API_KEY) {
            config.headers.Authorization = `Bearer ${API_KEY}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors gracefully
openAIClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // Server responded with error status
            console.error("OpenAI API error:", error.response.status, error.response.data);

            switch (error.response.status) {
                case 401:
                    return Promise.reject(new Error("Invalid API key. Please check your configuration."));
                case 429:
                    return Promise.reject(new Error("Rate limit exceeded. Please try again later."));
                case 500:
                case 502:
                case 503:
                    return Promise.reject(new Error("OpenAI service is temporarily unavailable."));
                default:
                    return Promise.reject(new Error("Failed to generate suggestion."));
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error("Network error:", error.message);
            return Promise.reject(new Error("Network error. Please check your connection."));
        } else {
            // Something else happened
            console.error("Request setup error:", error.message);
            return Promise.reject(error);
        }
    }
);

export async function getAISuggestion(prompt: string): Promise<string> {
    if (!API_KEY) {
        return "API key not configured.";
    }

    try {
        const { data } = await openAIClient.post("/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful assistant editing short form inputs. Reply concisely (≤280 chars), plain text, professional, no markdown, lists, or emojis.",
                },
                { role: "user", content: prompt },
            ],
            max_tokens: 120,
            temperature: 0.5,
        });

        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error("No content in response");
        }

        return sanitizeSuggestion(content);
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Sorry, I couldn't generate a suggestion right now.";

        console.error("AI suggestion error:", errorMessage);
        return errorMessage;
    }
}
