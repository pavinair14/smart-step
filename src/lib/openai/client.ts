import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY ?? "";

export const openAIClient = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY ? `Bearer ${API_KEY}` : "",
    },
});
