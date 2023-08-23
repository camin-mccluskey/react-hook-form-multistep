import type { FieldValues } from 'react-hook-form';
import type { FormStep } from './form';
export type MultiStepFormStepsContextFields = {
    activeStepIndex: number;
    reportStepValidity: (isFormStepValid: boolean) => void;
    handleStepSubmit: <StepFormData extends FieldValues>(onFormStepSubmit: (formStepData: StepFormData) => void) => (formStepData: StepFormData) => void;
};
export type MultiStepFormStepperContextFields = {
    formSteps: FormStep[];
    activeStepIndex: number;
    onChangeStep: (newStepIndex: number) => void;
    steppingDisabled: boolean;
};
