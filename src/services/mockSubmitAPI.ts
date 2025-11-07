export const mockSubmitAPI = (): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
        // In test environments, succeed deterministically
        if (process.env.NODE_ENV === 'test') {
            setTimeout(() => resolve({ message: "Data submitted successfully!" }), 100);
            return;
        }

        setTimeout(() => {
            const shouldFail = Math.random() < 0.2;
            if (shouldFail) reject(new Error("Network error"));
            else resolve({ message: "Data submitted successfully!" });
        }, 1500);
    });
};
