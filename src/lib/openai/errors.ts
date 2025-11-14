export const mapOpenAIError = (status?: number): string => {
    switch (status) {
        case 401:
            return "Invalid API key. Please check your configuration.";
        case 429:
            return "Rate limit exceeded. Please try again later.";
        case 500:
        case 502:
        case 503:
            return "OpenAI service is temporarily unavailable.";
        default:
            return "Failed to generate suggestion.";
    }
};
