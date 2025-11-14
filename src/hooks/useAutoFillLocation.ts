import { useEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
    cityOptions,
    stateOptions,
    countryOptions,
    countryCodes
} from "@/features/applicationForm/constants/personalInfo";
import { useTranslation } from "react-i18next";

export const useAutoFillLocation = () => {
    const { watch, setValue, getValues } = useFormContext();
    const { t } = useTranslation();

    const lastUpdate = useRef({ field: "", value: "" });

    const cities = useMemo(
        () => Object.fromEntries(cityOptions.map((c) => [c.value, c])),
        []
    );

    const states = useMemo(
        () => Object.fromEntries(stateOptions.map((s) => [s.value, s])),
        []
    );

    const updateField = (field: string, value: string) => {
        lastUpdate.current = { field, value };
        setValue(field, value, { shouldDirty: true, shouldValidate: true });
    };

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (!name || !["city", "state", "country"].includes(name)) return;

            const newValue = values[name] ?? "";

            // Prevent infinite loops
            if (
                lastUpdate.current.field === name &&
                lastUpdate.current.value === newValue
            )
                return;

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

                    const currentCity = cities[getValues("city")];
                    if (currentCity && currentCity.stateKey !== newValue) {
                        updateField("city", "");
                    }
                }
                return;
            }

            // country changed
            if (name === "country") {
                const country = newValue;

                const selectedState = states[getValues("state")];
                if (selectedState && selectedState.countryKey !== country) {
                    updateField("state", "");
                }

                const selectedCity = cities[getValues("city")];
                if (selectedCity && selectedCity.countryKey !== country) {
                    updateField("city", "");
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, getValues, cities, states]);

    const selectedCountry = watch("country");
    const selectedState = watch("state");
    const selectedCity = watch("city");

    const countryCodeOptions = useMemo(
        () =>
            countryCodes.map((c) => ({
                label: `${t(`geo.countryCodes.${c.countryKey}`)} (${c.code})`,
                value: c.code,
            })),
        [t]
    );

    const countrySelectOptions = useMemo(
        () =>
            countryOptions.map((c) => ({
                label: t(`geo.countries.${c.value}`),
                value: c.value,
            })),
        [t]
    );

    const stateSelectOptions = useMemo(() => {
        let filtered = stateOptions.filter(
            (s) => !selectedCountry || s.countryKey === selectedCountry
        );

        if (selectedState && !filtered.some((s) => s.value === selectedState)) {
            const current = stateOptions.find((s) => s.value === selectedState);
            if (current) filtered = [...filtered, current];
        }

        return filtered.map((s) => ({
            label: t(`geo.states.${s.value}`),
            value: s.value,
        }));
    }, [selectedCountry, selectedState, t]);

    const citySelectOptions = useMemo(() => {
        let filtered = cityOptions.filter(
            (c) => !selectedCountry || c.countryKey === selectedCountry
        );

        if (selectedCity && !filtered.some((c) => c.value === selectedCity)) {
            const current = cityOptions.find((c) => c.value === selectedCity);
            if (current) filtered = [...filtered, current];
        }

        return filtered.map((c) => ({
            label: t(`geo.cities.${c.value}`),
            value: c.value,
        }));
    }, [selectedCountry, selectedCity, t]);

    return {
        countryCodeOptions,
        countrySelectOptions,
        stateSelectOptions,
        citySelectOptions,
    };
};
