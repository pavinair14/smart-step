import { sanitizeSuggestion } from "@/lib/utils";
import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function getAISuggestion(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY ?? "";
    if (!apiKey) return "API key not configured.";

    try {
        const { data } = await axios.post(
            OPENAI_API_URL,
            {
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
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        return sanitizeSuggestion(data.choices[0]?.message?.content || "");
    } catch {
        return "Sorry, I couldn't generate a suggestion right now.";
    }
}
