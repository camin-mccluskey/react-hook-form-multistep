import React from 'react';
import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import type { FormStepOnSubmit } from './types';
type SubmitButtonProps<StepFormData extends FieldValues> = {
    label?: string;
    handleSubmit: UseFormHandleSubmit<StepFormData>;
    onSubmit: FormStepOnSubmit<StepFormData>;
    disabled: boolean;
};
export default function SubmitButton<StepFormData extends FieldValues>({ label, handleSubmit, onSubmit, disabled, }: SubmitButtonProps<StepFormData>): React.JSX.Element;
export {};
