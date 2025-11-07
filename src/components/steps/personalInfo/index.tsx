import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
import { ContactInfo } from "./ContactInfo";
import { genderOptions } from "./constants";
import type { FormField } from "./types";

const fields = [
    { id: "name", label: "Name" },
    { id: "nationalId", label: "National ID" },
    { id: "dateOfBirth", label: "Date of Birth", type: "date" },
    {
        id: "gender",
        label: "Gender",
        as: "select",
        options: genderOptions.map((item) => ({ label: item.label, value: item.value })),

    },
    { id: "address", label: "Address", fullWidth: true },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "country", label: "Country" },
];

const PersonalInfo: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

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
