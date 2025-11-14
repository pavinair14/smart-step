import { getAISuggestion } from "@/lib/openai/getSuggestion";
import { categorizeInput, isHelpRequest, type InputType } from "@/lib/openai/textAnalysis";
import type { TFunction } from "i18next";

/**
 * Generate guidance message for irrelevant input
 */
export const getGuidanceMessage = (context: string, t: TFunction): string => {
    const title = t('ai.guidance.title');
    const intro = t('ai.guidance.intro', { context });
    const option1 = t('ai.guidance.option1');
    const option2 = t('ai.guidance.option2');
    const option3 = t('ai.guidance.option3');
    const question = t('ai.guidance.question');

    return `${title} ${intro}\n• ${option1}\n• ${option2}\n• ${option3}\n\n${question}`;
};

/**
 * Build appropriate AI prompt based on input type and context
 */
export const buildPrompt = (
    inputType: InputType,
    text: string,
    context: string,
    t: TFunction
): string => {
    switch (inputType) {
        case 'empty':
            return t('ai.prompts.empty', { context });

        case 'help-request':
            return t('ai.prompts.helpRequest', { text, context });

        case 'content':
            return t('ai.prompts.improveContent', { text, context });

        case 'irrelevant':
        default:
            return '';
    }
};

/**
 * Build prompt for rewriting content
 */
export const buildRewritePrompt = (
    inputType: InputType,
    text: string,
    context: string,
    t: TFunction
): string => {
    switch (inputType) {
        case 'help-request':
            return t('ai.prompts.generateFresh', { context });

        case 'content':
            return t('ai.prompts.rewriteContent', { text, context });

        case 'irrelevant':
        case 'empty':
        default:
            return '';
    }
};

/**
 * Get AI suggestion with appropriate prompt
 */
export const getContextualSuggestion = async (
    userText: string,
    context: string,
    t: TFunction
): Promise<{ type: 'guidance' | 'ai-generated'; content: string }> => {
    const inputType = categorizeInput(userText, t);

    // Handle irrelevant text with guidance
    if (inputType === 'irrelevant') {
        return {
            type: 'guidance',
            content: getGuidanceMessage(context, t)
        };
    }

    // Generate AI response for valid input
    const prompt = buildPrompt(inputType, userText, context, t);
    const aiText = await getAISuggestion(prompt);
    const trimmedContent = aiText.trim();

    // If AI somehow returned the help request back, try generating without the request text
    if (inputType === 'help-request' && isHelpRequest(trimmedContent, t)) {
        const freshPrompt = t('ai.prompts.generateFresh', { context });
        const freshAiText = await getAISuggestion(freshPrompt);
        return {
            type: 'ai-generated',
            content: freshAiText.trim()
        };
    }

    return {
        type: 'ai-generated',
        content: trimmedContent
    };
};

/**
 * Get rewritten suggestion
 */
export const getRewrittenSuggestion = async (
    currentSuggestion: string,
    context: string,
    t: TFunction
): Promise<{ type: 'guidance' | 'ai-generated'; content: string }> => {
    const inputType = categorizeInput(currentSuggestion, t);

    // Handle irrelevant text with guidance
    if (inputType === 'irrelevant') {
        return {
            type: 'guidance',
            content: getGuidanceMessage(context, t)
        };
    }

    // Generate AI rewrite for valid input
    const prompt = buildRewritePrompt(inputType, currentSuggestion, context, t);

    // If no prompt (shouldn't happen but safety check), return guidance
    if (!prompt) {
        return {
            type: 'guidance',
            content: getGuidanceMessage(context, t)
        };
    }

    const aiText = await getAISuggestion(prompt);

    return {
        type: 'ai-generated',
        content: aiText.trim()
    };
};
