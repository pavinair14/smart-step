import { cityMap } from "@/constants/personalInfo";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";



//  Automatically fills state and country based on city input.
//   Clears state and country when city is not recognized.
export const useAutoFillLocation = () => {
    const { watch, setValue } = useFormContext();

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name !== "city") return;

            const cityValue = value.city?.trim() || "";
            const key = Object.keys(cityMap).find(
                (k) => k.toLowerCase() === cityValue.toLowerCase()
            );

            if (key) {
                const { state, country } = cityMap[key];
                setValue("state", state, { shouldValidate: true, shouldDirty: true });
                setValue("country", country, { shouldValidate: true, shouldDirty: true });
            } else {
                // Clear fields if the city isn't in the map
                setValue("state", "", { shouldValidate: true, shouldDirty: true });
                setValue("country", "", { shouldValidate: true, shouldDirty: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);
};
