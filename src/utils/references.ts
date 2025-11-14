/**
 * Generates a unique reference ID for application submissions
 * Format: APP-XXXXXX (where X is a random digit)
 */
export const generateReferenceId = (): string => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `APP-${randomNumber}`;
};