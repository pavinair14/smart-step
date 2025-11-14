import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/common/Field";
import { useAutoFillLocation } from "@/hooks/useAutoFillLocation";
import type { FormField } from "@/features/applicationForm/types/formField";

const PersonalInfo: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();
    const { t } = useTranslation();

    const {
        countryCodeOptions,
        countrySelectOptions,
        stateSelectOptions,
        citySelectOptions,
    } = useAutoFillLocation();

    const fields = [
        { id: "name", label: t("fields.name") },
        { id: "nationalId", label: t("fields.nationalId") },
        { id: "dateOfBirth", label: t("fields.dateOfBirth"), type: "date" },
        {
            id: "gender",
            label: t("fields.gender"),
            as: "select",
            options: [
                { label: t("options.male"), value: "male" },
                { label: t("options.female"), value: "female" },
                { label: t("options.other"), value: "other" },
            ],
        },

        { id: "address", label: t("fields.address"), fullWidth: true },
        { id: "city", label: t("fields.city"), as: "select", options: citySelectOptions },
        { id: "state", label: t("fields.state"), as: "select", options: stateSelectOptions },
        { id: "country", label: t("fields.country"), as: "select", options: countrySelectOptions },

    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-12 gap-y-4 w-full max-w-full min-w-0">
            {fields.map(({ id, label, type, as, options, fullWidth }) => (
                <Field
                    key={id}
                    id={id}
                    type={type}
                    label={label}
                    as={as as FormField}
                    options={options}
                    fullWidth={fullWidth}
                    register={register(id)}
                    error={errors[id]?.message?.toString()}
                />
            ))}

            {/* Email field */}
            <Field
                id="email"
                label={t("fields.email")}
                type="email"
                register={register("email")}
                error={errors.email?.message?.toString()}
            />

            {/* Phone group */}
            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="phCode"
                        label={t("fields.code")}
                        as="select"
                        options={countryCodeOptions}
                        register={register("phCode")}
                        error={errors.phCode?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="phone"
                        label={t("fields.phone")}
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
