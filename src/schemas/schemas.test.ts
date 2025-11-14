import '../i18n/testInit';
import {
    personalInfoSchema,
    FamilyFinancialInfoSchema,
    SituationDescriptionSchema,
} from './validationSchema';

describe('Personal Info Schema', () => {
    it('should validate correct personal info data', () => {
        const validData = {
            name: 'John Doe',
            nationalId: 'ABC123',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            email: 'john@example.com',
            phCode: '+1',
            phone: '1234567890',
        };

        const result = personalInfoSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject name with less than 2 characters', () => {
        const invalidData = {
            name: 'J',
            nationalId: 'ABC123',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            email: 'john@example.com',
            phCode: '+1',
            phone: '1234567890',
        };

        const result = personalInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
        }
    }); it('should reject invalid email format', () => {
        const invalidData = {
            name: 'John Doe',
            nationalId: 'ABC123',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            email: 'invalid-email',
            phCode: '+1',
            phone: '1234567890',
        };

        const result = personalInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Invalid email format');
        }
    });

    it('should reject future date of birth', () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);

        const invalidData = {
            name: 'John Doe',
            nationalId: 'ABC123',
            dateOfBirth: futureDate.toISOString().split('T')[0],
            gender: 'male',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            email: 'john@example.com',
            phCode: '+1',
            phone: '1234567890',
        };

        const result = personalInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Date of Birth cannot be in the future');
        }
    });

    it('should reject phone with non-numeric characters', () => {
        const invalidData = {
            name: 'John Doe',
            nationalId: 'ABC123',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            email: 'john@example.com',
            phCode: '+1',
            phone: 'abc123',
        };

        const result = personalInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Only digits allowed');
        }
    });

    it('should reject invalid national ID format', () => {
        const invalidData = {
            name: 'John Doe',
            nationalId: 'ABC@123',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            email: 'john@example.com',
            phCode: '+1',
            phone: '1234567890',
        };

        const result = personalInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('National ID must be alphanumeric');
        }
    });

    it('enforces phone digits based on phCode (+91 requires 10)', () => {
        const valid = {
            name: 'John Doe', nationalId: 'ABC123', dateOfBirth: '1990-01-01', gender: 'male', address: 'A', city: 'C', state: 'S', country: 'India', email: 'a@b.com', phCode: '+91', phone: '1234567890'
        };
        const invalid = { ...valid, phone: '123456789' };

        expect(personalInfoSchema.safeParse(valid).success).toBe(true);
        const res = personalInfoSchema.safeParse(invalid);
        expect(res.success).toBe(false);
        if (!res.success) {
            expect(res.error.issues.some(i => i.path.join('.') === 'phone')).toBe(true);
        }
    });

    it('enforces phone digits for +971 (requires 9)', () => {
        const data = {
            name: 'John Doe', nationalId: 'ABC123', dateOfBirth: '1990-01-01', gender: 'male', address: 'A', city: 'C', state: 'S', country: 'UAE', email: 'a@b.com', phCode: '+971', phone: '123456789'
        };
        expect(personalInfoSchema.safeParse(data).success).toBe(true);

        const tooLong = { ...data, phone: '1234567890' };
        expect(personalInfoSchema.safeParse(tooLong).success).toBe(false);
    });

    it('should reject missing required fields', () => {
        const invalidData = {
            name: '',
            nationalId: '',
            dateOfBirth: '',
            gender: '',
            address: '',
            city: '',
            state: '',
            country: '',
            email: '',
            phCode: '',
            phone: '',
        };

        const result = personalInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues.length).toBeGreaterThan(0);
        }
    });
});

describe('Family & Financial Info Schema', () => {
    it('should validate correct family and financial data', () => {
        const validData = {
            maritalStatus: 'single',
            dependents: 2,
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: 5000,
        };

        const result = FamilyFinancialInfoSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should accept string numbers and convert them', () => {
        const validData = {
            maritalStatus: 'single',
            dependents: '2',
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: '5000',
        };

        const result = FamilyFinancialInfoSchema.safeParse(validData);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(typeof result.data.dependents).toBe('number');
            expect(typeof result.data.monthlyIncome).toBe('number');
        }
    });

    it('should reject negative dependents', () => {
        const invalidData = {
            maritalStatus: 'single',
            dependents: -1,
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: 5000,
        };

        const result = FamilyFinancialInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Dependents cannot be negative');
        }
    });

    it('should reject more than 10 dependents', () => {
        const invalidData = {
            maritalStatus: 'single',
            dependents: 11,
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: 5000,
        };

        const result = FamilyFinancialInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Maximum 10 dependents allowed');
        }
    });

    it('should reject non-integer dependents', () => {
        const invalidData = {
            maritalStatus: 'single',
            dependents: 2.5,
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: 5000,
        };

        const result = FamilyFinancialInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Dependents must be a whole number');
        }
    });

    it('should reject negative monthly income', () => {
        const invalidData = {
            maritalStatus: 'single',
            dependents: 2,
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: -1000,
        };

        const result = FamilyFinancialInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Monthly Income must be positive');
        }
    });

    it('should reject empty dependents', () => {
        const invalidData = {
            maritalStatus: 'single',
            dependents: '',
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: 5000,
        };

        const result = FamilyFinancialInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Dependents is required');
        }
    });

    it('should reject empty monthly income', () => {
        const invalidData = {
            maritalStatus: 'single',
            dependents: 2,
            employmentStatus: 'employed',
            housingStatus: 'rented',
            currency: 'USD',
            monthlyIncome: '',
        };

        const result = FamilyFinancialInfoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Monthly Income is required');
        }
    });
});

describe('Situation Description Schema', () => {
    it('should validate correct situation description data', () => {
        const validData = {
            currentFinancialSituation: 'This is a valid description with more than 10 characters',
            employmentCircumstances: 'This is a valid employment description',
            reasonForApplying: 'This is a valid reason for applying',
        };

        const result = SituationDescriptionSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject description with less than 10 characters', () => {
        const invalidData = {
            currentFinancialSituation: 'Short',
            employmentCircumstances: 'This is a valid employment description',
            reasonForApplying: 'This is a valid reason for applying',
        };

        const result = SituationDescriptionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Current Financial Situation must be at least 10 characters');
        }
    });

    it('should reject empty required fields', () => {
        const invalidData = {
            currentFinancialSituation: '',
            employmentCircumstances: '',
            reasonForApplying: '',
        };

        const result = SituationDescriptionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            // Each field has 2 validation errors (nonempty + min), so expect 6 total
            expect(result.error.issues.length).toBe(6);
        }
    });
});