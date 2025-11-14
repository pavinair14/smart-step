import "@testing-library/jest-dom";
import { useFormStore } from "../store/formStore";

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (key: string) => {
                const translations: Record<string, string> = {
                    'app.title': 'Smart Step',
                    'steps.personalInfo': 'Personal Information',
                    'steps.familyFinancialInfo': 'Family & Financial Info',
                    'steps.situationDescriptions': 'Situation Descriptions',
                    'fields.name': 'Name',
                    'fields.nationalId': 'National ID',
                    'fields.dateOfBirth': 'Date of Birth',
                    'fields.gender': 'Gender',
                    'fields.address': 'Address',
                    'fields.city': 'City',
                    'fields.state': 'State',
                    'fields.country': 'Country',
                    'fields.email': 'Email',
                    'fields.phone': 'Phone',
                    'fields.maritalStatus': 'Marital Status',
                    'fields.dependents': 'Dependents',
                    'fields.employmentStatus': 'Employment Status',
                    'fields.housingStatus': 'Housing Status',
                    'fields.currency': 'Currency',
                    'fields.monthlyIncome': 'Monthly Income',
                    'fields.currentFinancialSituation': 'Current Financial Situation',
                    'fields.employmentCircumstances': 'Employment Circumstances',
                    'fields.reasonForApplying': 'Reason for Applying',
                    'buttons.next': 'Next',
                    'buttons.back': 'Back',
                    'buttons.submit': 'Submit',
                    'buttons.ok': 'OK',
                    'buttons.cancel': 'Close',
                    'buttons.clearForm': 'Clear form',
                    'messages.allFieldsRequired': 'All fields must be filled to proceed',
                    'messages.formSubmitted': 'Form Submitted',
                    'messages.formSubmittedSuccess': 'Your form has been submitted successfully.',
                    'messages.formProgress': 'Form progress',
                    'submission.title': 'Form Submitted',
                    'submission.backToHome': 'Back to Home',
                    'aria.stepLabel': 'Step {{current}} of {{total}}: {{label}}',
                    // Test-specific keys for Stepper tests
                    'step.one': 'Step One',
                    'step.two': 'Step Two',
                    'step.three': 'Step Three',
                    'step.only': 'Only Step',
                };
                return translations[key] || key;
            },
            i18n: { changeLanguage: jest.fn(), language: 'en' },
        };
    },
}));


// Mock the AI client
jest.mock("@/lib/openai/getSuggestion", () => ({
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

