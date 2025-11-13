/**
 * Generates a unique reference ID for application submissions
 * Format: APP-XXXXXX (where X is a random digit)
 */
export const generateReferenceId = (): string => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `APP-${randomNumber}`;
};

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
