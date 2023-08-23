import React from 'react';
import type { MultiStepFormStepperContextFields } from './types';
type MultiStepFormStepperProps = {
    render?: ({ formSteps, activeStepIndex, onChangeStep, steppingDisabled, }: MultiStepFormStepperContextFields) => JSX.Element;
};
export default function MultiStepFormStepper({ render }: MultiStepFormStepperProps): React.JSX.Element;
export {};
