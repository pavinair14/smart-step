export const genderOptions = [
    { value: "male" },
    { value: "female" },
    { value: "other" },
] as const;

export const countryCodes = [
    { code: "+91", countryKey: "india", digits: 10 },
    { code: "+971", countryKey: "uae", digits: 9 },
    { code: "+1", countryKey: "usa", digits: 10 },
    { code: "+92", countryKey: "pakistan", digits: 10 },
] as const;

export const countryOptions = [
    { value: "india" },
    { value: "uae" },
    { value: "usa" },
    { value: "pakistan" },
] as const;

export const stateOptions = [
    // India
    { value: "tamilNadu", countryKey: "india" },
    { value: "karnataka", countryKey: "india" },
    { value: "delhi", countryKey: "india" },
    // UAE
    { value: "dubai", countryKey: "uae" },
    { value: "abuDhabi", countryKey: "uae" },
    { value: "sharjah", countryKey: "uae" },
    // USA
    { value: "newYork", countryKey: "usa" },
    { value: "texas", countryKey: "usa" },
    { value: "florida", countryKey: "usa" },
    // Pakistan
    { value: "punjab", countryKey: "pakistan" },
    { value: "sindh", countryKey: "pakistan" },
    { value: "khyberPakhtunkhwa", countryKey: "pakistan" },
] as const;

export const cityOptions = [
    // India
    { value: "chennai", stateKey: "tamilNadu", countryKey: "india" },
    { value: "bangalore", stateKey: "karnataka", countryKey: "india" },
    { value: "delhi", stateKey: "delhi", countryKey: "india" },
    // UAE
    { value: "dubai", stateKey: "dubai", countryKey: "uae" },
    { value: "abuDhabi", stateKey: "abuDhabi", countryKey: "uae" },
    { value: "sharjah", stateKey: "sharjah", countryKey: "uae" },
    // USA
    { value: "newYork", stateKey: "newYork", countryKey: "usa" },
    { value: "houston", stateKey: "texas", countryKey: "usa" },
    { value: "miami", stateKey: "florida", countryKey: "usa" },
    // Pakistan
    { value: "lahore", stateKey: "punjab", countryKey: "pakistan" },
    { value: "karachi", stateKey: "sindh", countryKey: "pakistan" },
    { value: "peshawar", stateKey: "khyberPakhtunkhwa", countryKey: "pakistan" },
] as const;

export const cityMap: Record<string, { stateKey: string; countryKey: string }> = {
    // India
    Chennai: { stateKey: "tamilNadu", countryKey: "india" },
    Bangalore: { stateKey: "karnataka", countryKey: "india" },
    Delhi: { stateKey: "delhi", countryKey: "india" },
    // UAE
    Dubai: { stateKey: "dubai", countryKey: "uae" },
    "Abu Dhabi": { stateKey: "abuDhabi", countryKey: "uae" },
    Sharjah: { stateKey: "sharjah", countryKey: "uae" },
    // USA
    "New York": { stateKey: "newYork", countryKey: "usa" },
    Houston: { stateKey: "texas", countryKey: "usa" },
    Miami: { stateKey: "florida", countryKey: "usa" },
    // Pakistan
    Lahore: { stateKey: "punjab", countryKey: "pakistan" },
    Karachi: { stateKey: "sindh", countryKey: "pakistan" },
    Peshawar: { stateKey: "khyberPakhtunkhwa", countryKey: "pakistan" },
};
