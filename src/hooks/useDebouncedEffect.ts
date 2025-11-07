import { useEffect } from "react";

export function useDebouncedEffect<T>(
    effect: (value: T) => void,
    value: T,
    delay: number
) {
    useEffect(() => {
        const handler = setTimeout(() => effect(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
}