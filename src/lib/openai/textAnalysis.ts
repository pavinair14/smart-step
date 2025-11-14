/**
 * Text analysis utilities for detecting user intent and text types
 */

import type { TFunction } from "i18next";

/**
 * Detect if text is a help request
 */
export const isHelpRequest = (text: string, t: TFunction): boolean => {
    const lower = text.toLowerCase();
    // Help patterns remain static for now, as regex is language-agnostic
    const helpPatterns = [
        /\b(help|assist|aid)\b.*\b(writ|prepar|creat|draft|generat|compos|make)/i,
        /\b(need|require|want|can you|could you|would you)\b.*\b(help|writ|prepar|creat|draft)/i,
        /\b(writ|prepar|creat|draft|generat|compos)\b.*\b(for me|statement|description)/i,
        /\bhow (do i|can i|to)\b.*\b(writ|describ)/i
    ];
    void t; // avoid unused param warning
    return helpPatterns.some(pattern => pattern.test(lower));
};

/**
 * Detect if text is irrelevant (greetings, chat, unrelated)
 */

export const isIrrelevantText = (text: string, t: TFunction): boolean => {
    if (text.length < 10) return true;

    const lower = text.toLowerCase().trim();
    const words = lower.split(/\s+/);

    // Get greetings and chat phrases from translation

    const greetings = t('ai.detection.greetings', { returnObjects: true }) as string[];
    if (greetings.includes(words[0])) return true;

    const chatPhrases = t('ai.detection.chatPhrases', { returnObjects: true }) as string[];
    if (chatPhrases.some(phrase => lower.includes(phrase))) return true;

    return false;
};

/**
 * Determine the type of user input
 */
export type InputType = 'empty' | 'irrelevant' | 'help-request' | 'content';

export const categorizeInput = (text: string, t: TFunction): InputType => {
    const trimmed = text.trim();

    if (trimmed.length === 0) return 'empty';
    if (isIrrelevantText(trimmed, t)) return 'irrelevant';
    if (isHelpRequest(trimmed, t)) return 'help-request';

    return 'content';
};
