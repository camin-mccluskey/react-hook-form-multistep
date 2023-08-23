import React from 'react';
import type { FormStep } from './types';
type BasicStepperProps = {
    formSteps: FormStep[];
    activeStepIndex: number;
    steppingDisabled: boolean;
    onChangeStep: (stepIdx: number) => void;
};
export default function BasicStepper({ formSteps, activeStepIndex, steppingDisabled, onChangeStep, }: BasicStepperProps): React.JSX.Element;
export {};
