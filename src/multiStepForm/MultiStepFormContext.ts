import { createContext, useContext } from "react";

type MultiStepFormStepsContextProps = {
  activeStepIndex: number;
  reportStepValidity: (isFormStepValid: boolean) => void;
  handleStepSubmit: <T>(
    onFormStepSubmit: (formStepData: T) => void
  ) => (formStepData: T) => void;
};

export const MultiStepFormStepsContext =
  createContext<MultiStepFormStepsContextProps>({
    activeStepIndex: 0,
    reportStepValidity: (_: boolean) => undefined,
    handleStepSubmit:
      <T>(onFormStepSubmit: (formStepData: T) => void) =>
      (formStepData: T) =>
        onFormStepSubmit(formStepData),
  });

type MultiStepFormStepperContextProps = {
  numSteps: number;
  activeStepIndex: number;
  onChangeStep: (newStepIndex: number) => void;
  canStep: boolean;
};

export const MultiStepFormStepperContext =
  createContext<MultiStepFormStepperContextProps>({
    numSteps: 0,
    activeStepIndex: 0,
    onChangeStep: (_: number) => undefined,
    canStep: false,
  });

export function useMultiStepFormContext() {
  const stepsContext = useContext(MultiStepFormStepsContext);
  const stepperContext = useContext(MultiStepFormStepperContext);
  if (!stepsContext || !stepperContext) {
    throw new Error(
      `MultiStepForm components cannot be rendered outside the MultiStepForm component`
    );
  }
  return { stepsContext, stepperContext };
}
