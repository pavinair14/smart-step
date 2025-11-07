import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeSuggestion(text: string, maxLen = 400): string {
  if (!text) return "";
  const cleaned = text
    .replace(/^\s*["']+|["']+$/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen).trimEnd() : cleaned;
}