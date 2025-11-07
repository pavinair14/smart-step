import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiStepForm } from './MultiStepForm';

/** waits for lazy-loaded step components */
const waitForStepToLoad = async (delay = 100) => {
    await act(async () => {
        await new Promise((r) => setTimeout(r, delay));
    });
};

/** fill step 1 form */
const fillStep1 = async (user: ReturnType<typeof userEvent.setup>) => {
    await waitForStepToLoad();

    await user.type(screen.getByLabelText(/name/i), 'Pavithra');
    await user.type(screen.getByLabelText(/national id/i), '12345678');
    await user.type(screen.getByLabelText(/date of birth/i), '1998-05-15');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'female');
    await user.type(screen.getByLabelText(/address/i), '123 XYZ street');
    await user.type(screen.getByLabelText(/city/i), 'Chennai');
    await user.type(screen.getByLabelText(/state/i), 'TN');
    await user.type(screen.getByLabelText(/country/i), 'India');
    await user.type(screen.getByLabelText(/email/i), 'pavithra@example.com');
    await user.selectOptions(screen.getByLabelText(/code/i), '+91');
    await user.type(screen.getByLabelText(/phone/i), '9876543210');
};

/** fills step2 form */
const fillStep2 = async (user: ReturnType<typeof userEvent.setup>) => {
    await waitFor(() => expect(screen.getByLabelText(/marital status/i)).toBeInTheDocument());

    await user.selectOptions(screen.getByLabelText(/marital status/i), 'single');
    await user.type(screen.getByLabelText(/dependents/i), '2');
    await user.selectOptions(screen.getByLabelText(/employment status/i), 'employed');
    await user.type(screen.getByLabelText(/housing status/i), 'rented');
    await user.selectOptions(screen.getByLabelText(/currency/i), 'INR');
    await user.type(screen.getByLabelText(/monthly income/i), '5000');
};

/** fills step3 form */
const fillStep3 = async (user: ReturnType<typeof userEvent.setup>) => {
    await waitFor(() => expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0));

    const [situation, employment, reason] = screen.getAllByRole('textbox');
    await user.type(situation, 'This is my current financial situation');
    await user.type(employment, 'This is my employment circumstances');
    await user.type(reason, 'This is my reason for applying');
};

/** Navigation helper */
const clickNext = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', { name: /next/i }));
};

// --- Test Suite --------------------------------------------------

describe('MultiStepForm', () => {
    const setup = () => userEvent.setup();

    it('renders the first step (Personal Info)', async () => {
        render(<MultiStepForm />);
        await waitForStepToLoad();

        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('displays all three steps in the stepper', async () => {
        render(<MultiStepForm />);
        await waitForStepToLoad();

        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByText('Family & Financial Info')).toBeInTheDocument();
        expect(screen.getByText('Situation Descriptions')).toBeInTheDocument();
    });

    it('shows only Next button on first step', async () => {
        render(<MultiStepForm />);
        await waitForStepToLoad();

        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    });

    it('shows validation errors when proceeding with empty fields', async () => {
        const user = setup();
        render(<MultiStepForm />);
        await waitForStepToLoad();

        await clickNext(user);

        await waitFor(() => {
            const errors = document.querySelectorAll('.text-red-500 svg');
            expect(errors.length).toBeGreaterThan(0);
        });
    });

    it('navigates to step 2 when step 1 is valid', async () => {
        const user = setup();
        render(<MultiStepForm />);
        await fillStep1(user);
        await clickNext(user);

        await waitFor(() =>
            expect(screen.getByLabelText(/marital status/i)).toBeInTheDocument()
        );
    });

    it('allows navigating back to previous step', async () => {
        const user = setup();
        render(<MultiStepForm />);

        await fillStep1(user);
        await clickNext(user);
        await waitFor(() => screen.getByLabelText(/marital status/i));

        await user.click(screen.getByRole('button', { name: /back/i }));

        await waitFor(() => expect(screen.getByLabelText(/name/i)).toBeInTheDocument());
    });

    it('shows Submit button on the last step', async () => {
        const user = setup();
        render(<MultiStepForm />);

        await fillStep1(user);
        await clickNext(user);

        await fillStep2(user);
        await clickNext(user);

        await waitFor(() =>
            expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
        );
    });

    it('shows a confirmation modal on submit and resets to step 1 after OK', async () => {
        const user = setup();
        render(<MultiStepForm />);

        await fillStep1(user);
        await clickNext(user);

        await fillStep2(user);
        await clickNext(user);

        await fillStep3(user);
        await user.click(screen.getByRole('button', { name: /submit/i }));

        // Confirmation modal
        await waitFor(() => {
            expect(screen.getByText(/form submitted/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
        });

        await user.click(screen.getByRole('button', { name: /ok/i }));

        await waitFor(() =>
            expect(screen.getByText('Personal Information')).toBeInTheDocument()
        );
    }, 10000);
});
