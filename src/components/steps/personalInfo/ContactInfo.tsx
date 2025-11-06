// src/steps/PersonalInfo/ContactInfo.tsx
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
import { countryCodes } from "./constants";

export const ContactInfo: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();

    const countryCodeOptions = useMemo(() =>
        countryCodes.map((c) => ({ label: `${c.label} (${c.code})`, value: c.code })),
        []
    );

    return (
        <>
            <Field
                id="email"
                label="Email"
                type="email"
                register={register("email")}
                error={errors.email?.message as string | undefined}
            />

            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="phoneCode"
                        label="Code"
                        as="select"
                        register={register("phCode")}
                        options={countryCodeOptions}
                        error={errors.phCode?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="phone"
                        label="Phone"
                        type="tel"
                        register={register("phone")}
                        error={errors.phone?.message as string | undefined}

                    />
                </div>
            </div>
        </>
    );
};
