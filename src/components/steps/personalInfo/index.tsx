import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field } from "../../shared/Field";
import { ContactInfo } from "./ContactInfo";
import { genderOptions } from "./constants";
import type { FormField } from "./types";



const PersonalInfo: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { t } = useTranslation();

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
            <ContactInfo />
        </div>
    );
};

export default PersonalInfo;
