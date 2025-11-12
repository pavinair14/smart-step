import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field } from "../common/Field";
import { useMemo } from "react";
import { countryCodes, genderOptions } from "@/constants/personalInfo";
import type { FormField } from "@/types/formField";



const PersonalInfo: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { t } = useTranslation();


    const countryCodeOptions = useMemo(() =>
        countryCodes.map((c) => ({ label: `${c.label} (${c.code})`, value: c.code })),
        []
    );

    const fields = [
        { id: "name", label: t('fields.name') },
        { id: "nationalId", label: t('fields.nationalId') },
        { id: "dateOfBirth", label: t('fields.dateOfBirth'), type: "date" },
        {
            id: "gender",
            label: t('fields.gender'),
            as: "select",
            options: genderOptions.map((item) => ({
                label: t(`options.${item.value}`),
                value: item.value
            })),
        },
        { id: "address", label: t('fields.address'), fullWidth: true },
        { id: "city", label: t('fields.city') },
        { id: "state", label: t('fields.state') },
        { id: "country", label: t('fields.country') },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {fields.map(({ id, label, type, as, options, fullWidth }) => (
                <Field
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    as={as as FormField}
                    options={options}
                    fullWidth={fullWidth}
                    register={register(id)}
                    error={errors[id]?.message as string | undefined}
                />
            ))}
            <Field
                id="email"
                label={t('fields.email')}
                type="email"
                register={register("email")}
                error={errors.email?.message as string | undefined}
            />

            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="phoneCode"
                        label={t('fields.code')}
                        as="select"
                        register={register("phCode")}
                        options={countryCodeOptions}
                        error={errors.phCode?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="phone"
                        label={t('fields.phone')}
                        type="tel"
                        register={register("phone")}
                        error={errors.phone?.message as string | undefined}

                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
