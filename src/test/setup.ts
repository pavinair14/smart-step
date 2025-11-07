import "@testing-library/jest-dom";
import { useFormStore } from "../store/formStore";

// Mock the AI client
jest.mock("@/services/aiClient", () => ({
    getAISuggestion: jest.fn().mockResolvedValue("Mocked AI suggestion for testing"),
}));

// Mock Vite env 
(globalThis as any).importMetaEnv = {
    VITE_OPENAI_API_KEY: "test-api-key",
};

// Mock matchMedia
window.matchMedia = window.matchMedia || (() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
})) as any;

// Mock ResizeObserver
global.ResizeObserver = class {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
};

// Reset Zustand + localStorage before each test
beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    useFormStore.getState().reset();
    jest.clearAllMocks();
});
