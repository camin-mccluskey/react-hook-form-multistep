import React from 'react';
import { useMultiStepFormContext } from './MultiStepFormContext';
import Stepper from './Stepper';
export default function MultiStepFormStepper({ render }) {
    const { stepperContext } = useMultiStepFormContext();
    const { formSteps, activeStepIndex, onChangeStep, steppingDisabled } = stepperContext;
    return render ? (render(stepperContext)) : (React.createElement(Stepper, { formSteps: formSteps, activeStepIndex: activeStepIndex, onChangeStep: onChangeStep, steppingDisabled: steppingDisabled }));
}
//# sourceMappingURL=MultiStepFormStepper.js.map