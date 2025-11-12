export const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to specify", value: "other" },
] as const;

export const countryCodes = [
    { code: "+91", label: "India", digits: 10 },
    { code: "+971", label: "UAE", digits: 9 },
    { code: "+1", label: "USA", digits: 10 },
    { code: "+44", label: "UK", digits: 10 },
] as const;

export const cityMap: Record<
    string,
    { state: string; country: string }
> = {
    Chennai: { state: "Tamil Nadu", country: "India" },
    Bangalore: { state: "Karnataka", country: "India" },
    Mumbai: { state: "Maharashtra", country: "India" },
    Hyderabad: { state: "Telangana", country: "India" },
    Dubai: { state: "Dubai", country: "UAE" },
    "Abu Dhabi": { state: "Abu Dhabi", country: "UAE" },
    Sharjah: { state: "Sharjah", country: "UAE" },
    Ajman: { state: "Ajman", country: "UAE" },
};
