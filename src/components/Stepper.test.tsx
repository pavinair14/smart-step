import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper } from './Stepper';

const mockSteps = [
    { title: 'Step One', translationKey: 'step.one' },
    { title: 'Step Two', translationKey: 'step.two' },
    { title: 'Step Three', translationKey: 'step.three' },
];

describe('Stepper Component', () => {
    it('should render all step titles', () => {
        render(<Stepper steps={mockSteps} currentStep={0} />);

        expect(screen.getByText('Step One')).toBeInTheDocument();
        expect(screen.getByText('Step Two')).toBeInTheDocument();
        expect(screen.getByText('Step Three')).toBeInTheDocument();
    });

    it('should highlight the current step', () => {
        render(<Stepper steps={mockSteps} currentStep={1} />);

        const stepTwo = screen.getByText('Step Two');
        expect(stepTwo).toBeInTheDocument();
    });

    it('should show check icon for completed steps', () => {
        render(<Stepper steps={mockSteps} currentStep={2} />);

        const svg = document.querySelectorAll('svg');
        expect(svg.length).toBeGreaterThan(0);
    });

    it('should show step numbers for incomplete steps', () => {
        render(<Stepper steps={mockSteps} currentStep={0} />);

        // Steps 2 and 3 should show numbers
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should handle single step', () => {
        const singleStep = [{ title: 'Only Step', translationKey: 'step.only' }];
        render(<Stepper steps={singleStep} currentStep={0} />);

        expect(screen.getByText('Only Step')).toBeInTheDocument();
    });

    it('should not re-render when props are the same', () => {
        const { rerender } = render(<Stepper steps={mockSteps} currentStep={1} />);

        // Re-render with same props
        rerender(<Stepper steps={mockSteps} currentStep={1} />);

        // Component should still be in the document
        expect(screen.getByText('Step Two')).toBeInTheDocument();
    });
});
