import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import type { FormStepOnSubmit } from './types';
type UseMultiStepSubmitProps<StepFormData extends FieldValues> = {
    handleSubmit: UseFormHandleSubmit<StepFormData>;
    onSubmit: FormStepOnSubmit<StepFormData>;
};
declare const useMultiStepSubmit: <StepFormData extends FieldValues>({ handleSubmit, onSubmit, }: UseMultiStepSubmitProps<StepFormData>) => (nextStepIndex?: number) => Promise<void>;
export default useMultiStepSubmit;
