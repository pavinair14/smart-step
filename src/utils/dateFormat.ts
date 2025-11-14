/**
 * Formats a date for display in the submission modal
 * Format: "MMM DD, YYYY" (e.g., "Nov 13, 2025")
 */
export const formatSubmissionDate = (date: Date = new Date()): string => {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};