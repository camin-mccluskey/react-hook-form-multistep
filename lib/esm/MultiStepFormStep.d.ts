/// <reference types="react" />
import type { FieldValues } from 'react-hook-form';
import type { MultiStepFormStepRenderFunction } from './types';
export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
    renderStepForm: MultiStepFormStepRenderFunction<StepFormData>;
    name?: string;
    formStepIndex?: number;
};
export default function MultiStepFormStep<StepFormData extends FieldValues>({ renderStepForm, formStepIndex, }: MultiStepFormStepProps<StepFormData>): import("react").ReactElement<import("./types").FormStepBaseProps<StepFormData>, string | import("react").JSXElementConstructor<any>> | null;
