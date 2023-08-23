import React from 'react';
import { type FieldValues } from 'react-hook-form';
import { type ReactElement } from 'react';
import MultiStepFormStep, { type MultiStepFormStepProps } from './MultiStepFormStep';
import MultiStepFormStepper from './MultiStepFormStepper';
export type MultiStepFormProps<ParentFormData extends FieldValues> = {
    children: ReactElement<MultiStepFormStepProps<Partial<ParentFormData>>> | ReactElement<MultiStepFormStepProps<Partial<ParentFormData>>>[];
};
declare function MultiStepForm<ParentFormData extends FieldValues>({ children, }: MultiStepFormProps<ParentFormData>): React.JSX.Element;
declare namespace MultiStepForm {
    var Step: typeof MultiStepFormStep;
    var Stepper: typeof MultiStepFormStepper;
}
export default MultiStepForm;
