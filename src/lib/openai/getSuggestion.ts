import { sanitizeSuggestion } from "@/lib/utils/sanitize";
import { openAIClient } from "./client";
import { mapOpenAIError } from "./errors";

export async function getAISuggestion(prompt: string): Promise<string> {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
        return "API key not configured.";
    }

    try {
        const { data } = await openAIClient.post("/chat/completions", {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You edit short form inputs. Keep responses under 280 chars, plain text only—no markdown, no lists, no emojis.",
                },
                { role: "user", content: prompt },
            ],
            max_tokens: 120,
            temperature: 0.3,
        });

        const content = data?.choices?.[0]?.message?.content;
        if (!content) return "No response from AI.";

        return sanitizeSuggestion(content.trim());
    } catch (err: any) {
        const message = err.response
            ? mapOpenAIError(err.response.status)
            : "Network error. Please try again.";

        console.error("AI Suggestion Error:", message);
        return message;
    }
}
