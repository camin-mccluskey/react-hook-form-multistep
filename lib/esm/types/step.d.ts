import type { BaseSyntheticEvent, ReactElement } from 'react';
import type { DeepPartial, FieldValues } from 'react-hook-form';
export type FormStepOnSubmit<StepFormData extends FieldValues> = (formData: StepFormData, event?: BaseSyntheticEvent, nextStepIndex?: number) => void;
export type FormStepBaseProps<StepFormData extends FieldValues> = {
    data?: DeepPartial<StepFormData>;
    onSubmit: FormStepOnSubmit<StepFormData>;
    reportValidity: (isValid: boolean) => void;
};
export type MultiStepFormStepRenderFunction<StepFormData extends FieldValues> = ({ reportStepValidity, handleStepSubmit, }: {
    reportStepValidity: (isFormStepValid: boolean) => void;
    handleStepSubmit: <StepFormData extends FieldValues>(onFormStepSubmit: (formStepDate: StepFormData) => void) => FormStepOnSubmit<StepFormData>;
}) => ReactElement<FormStepBaseProps<StepFormData>>;
