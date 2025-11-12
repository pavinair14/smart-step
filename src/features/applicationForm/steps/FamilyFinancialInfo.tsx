import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field } from "../common/Field";
import { currencies, employmentStatusOptions, maritalStatusOptions } from "@/constants/familyfinancialInfo";


const FamilyFinancialInfo: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {/* Marital Status */}
            <Field
                id="maritalStatus"
                label={t('fields.maritalStatus')}
                as="select"
                register={register("maritalStatus")}
                options={maritalStatusOptions}
                error={errors.maritalStatus?.message as string | undefined}
            />

            {/* Dependents */}
            <Field
                id="dependents"
                label={t('fields.dependents')}
                type="number"
                register={register("dependents")}
                error={errors.dependents?.message as string}
                placeholder="Enter number of dependents"
            />

            {/* Employment Status */}
            <Field
                id="employmentStatus"
                label={t('fields.employmentStatus')}
                as="select"
                register={register("employmentStatus")}
                options={employmentStatusOptions}
                error={errors.employmentStatus?.message as string | undefined}
            />

            {/* Housing Status */}
            <Field
                id="housingStatus"
                label={t('fields.housingStatus')}
                register={register("housingStatus")}
                error={errors.housingStatus?.message as string}
                placeholder={t('placeholders.enterHousingStatus')}
            />

            {/* Monthly Income (Currency + Input) */}
            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="currency"
                        label={t('fields.currency')}
                        as="select"
                        register={register("currency")}
                        options={currencies.map((c) => ({
                            label: c.label,
                            value: c.code,
                        }))}
                        error={errors.currency?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="monthlyIncome"
                        label={t('fields.monthlyIncome')}
                        type="number"
                        register={register("monthlyIncome")}
                        error={errors.monthlyIncome?.message as string | undefined}
                    />
                </div>
            </div>
        </div >
    );
};

export default FamilyFinancialInfo;
