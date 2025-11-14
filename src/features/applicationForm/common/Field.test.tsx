import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { Field } from './Field';

// Wrapper component to provide form context
const FieldWrapper = ({ children, id }: any) => {
    const methods = useForm();
    const register = methods.register(id || 'testField');

    return (
        <FormProvider {...methods}>
            {typeof children === 'function' ? children(register, methods) : children}
        </FormProvider>
    );
};

describe('Field Component', () => {
    it('should render an input field by default', () => {
        render(
            <FieldWrapper id="testField">
                {(register: any) => (
                    <Field
                        id="testField"
                        label="Test Label"
                        register={register}
                    />
                )}
            </FieldWrapper>
        );

        expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render a select field when as="select"', () => {
        const options = [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
        ];

        render(
            <FieldWrapper id="testSelect">
                {(register: any) => (
                    <Field
                        id="testSelect"
                        label="Test Select"
                        as="select"
                        options={options}
                        register={register}
                    />
                )}
            </FieldWrapper>
        );

        const selectElement = screen.getByLabelText(/test select/i);
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.tagName).toBe('SELECT');
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should render a textarea when as="textarea"', () => {
        render(
            <FieldWrapper id="testTextarea">
                {(register: any) => (
                    <Field
                        id="testTextarea"
                        label="Test Textarea"
                        as="textarea"
                        register={register}
                    />
                )}
            </FieldWrapper>
        );

        const textarea = screen.getByLabelText(/test textarea/i);
        expect(textarea).toBeInTheDocument();
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('should display error message when error prop is provided', () => {
        render(
            <FieldWrapper id="testField">
                {(register: any) => (
                    <Field
                        id="testField"
                        label="Test Field"
                        register={register}
                        error="This field is required"
                    />
                )}
            </FieldWrapper>
        );

        // Error icon should be present
        const svgElements = document.querySelectorAll('svg');
        expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should apply fullWidth class when fullWidth is true', () => {
        const { container } = render(
            <FieldWrapper id="testField">
                {(register: any) => (
                    <Field
                        id="testField"
                        label="Test Field"
                        register={register}
                        fullWidth={true}
                    />
                )}
            </FieldWrapper>
        );

        const fieldContainer = container.querySelector('.sm\\:col-span-2');
        expect(fieldContainer).toBeInTheDocument();
    });

    it('should render with different input types', () => {
        render(
            <FieldWrapper id="emailField">
                {(register: any) => (
                    <Field
                        id="emailField"
                        label="Email"
                        type="email"
                        register={register}
                    />
                )}
            </FieldWrapper>
        );

        const input = screen.getByLabelText(/email/i);
        expect(input).toHaveAttribute('type', 'email');
    });

    it('should show placeholder text', () => {
        render(
            <FieldWrapper id="testField">
                {(register: any) => (
                    <Field
                        id="testField"
                        label="Test Field"
                        register={register}
                        placeholder="Enter some text"
                    />
                )}
            </FieldWrapper>
        );

        const input = screen.getByPlaceholderText('Enter some text');
        expect(input).toBeInTheDocument();
    });

    it('should handle user input', async () => {
        const user = userEvent.setup();

        render(
            <FieldWrapper id="testField">
                {(register: any) => (
                    <Field
                        id="testField"
                        label="Test Field"
                        register={register}
                    />
                )}
            </FieldWrapper>
        );

        const input = screen.getByLabelText(/test field/i) as HTMLInputElement;
        await user.type(input, 'Hello World');

        expect(input.value).toBe('Hello World');
    });
});