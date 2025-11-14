import { useEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { cityOptions, stateOptions } from "@/constants/personalInfo";

//  Automatically handles cascading location field updates
export const useAutoFillLocation = () => {
    const { watch, setValue, getValues } = useFormContext();

    const lastUpdate = useRef({ field: "", value: "" });

    const cities = useMemo(() => Object.fromEntries(cityOptions.map(c => [c.value, c])), []);
    const states = useMemo(() => Object.fromEntries(stateOptions.map(s => [s.value, s])), []);

    // A single helper that updates a field safely
    const updateField = (field: string, value: string) => {
        lastUpdate.current = { field, value };
        setValue(field, value, { shouldDirty: true, shouldValidate: true });
    };

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (!name || !["city", "state", "country"].includes(name)) return;

            const newValue = values[name] ?? "";

            // Prevent infinite loops
            if (lastUpdate.current.field === name && lastUpdate.current.value === newValue) return;

            //  City changed 
            if (name === "city") {
                const city = cities[newValue];
                if (city) {
                    updateField("state", city.stateKey);
                    updateField("country", city.countryKey);
                }
                return;
            }

            // state changed
            if (name === "state") {
                const state = states[newValue];
                if (state) {
                    if (getValues("country") !== state.countryKey) {
                        updateField("country", state.countryKey);
                    }

                    const city = cities[getValues("city")];
                    if (city && city.stateKey !== newValue) {
                        updateField("city", "");
                    }
                }
                return;
            }

            // country changed
            if (name === "country") {
                const country = newValue;

                // Validate state
                const stateValue = getValues("state");
                const selectedState = states[stateValue];
                if (selectedState && selectedState.countryKey !== country) {
                    updateField("state", "");
                }

                // Validate city
                const cityValue = getValues("city");
                const selectedCity = cities[cityValue];
                if (selectedCity && selectedCity.countryKey !== country) {
                    updateField("city", "");
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, getValues, cities, states]);
};
