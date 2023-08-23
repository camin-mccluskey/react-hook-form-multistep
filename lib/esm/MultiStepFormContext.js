import { createContext, useContext } from 'react';
export const MultiStepFormStepsContext = createContext({
    activeStepIndex: 0,
    reportStepValidity: (_) => undefined,
    handleStepSubmit: (onFormStepSubmit) => (formStepData) => onFormStepSubmit(formStepData),
});
export const MultiStepFormStepperContext = createContext({
    formSteps: [],
    activeStepIndex: 0,
    onChangeStep: (_) => undefined,
    steppingDisabled: true,
});
export function useMultiStepFormContext() {
    const stepsContext = useContext(MultiStepFormStepsContext);
    const stepperContext = useContext(MultiStepFormStepperContext);
    if (!stepsContext || !stepperContext) {
        throw new Error(`MultiStepForm components cannot be rendered outside the MultiStepForm component`);
    }
    return { stepsContext, stepperContext };
}
//# sourceMappingURL=MultiStepFormContext.js.map