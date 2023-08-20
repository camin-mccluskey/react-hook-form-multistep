import { createContext, useContext } from "react";
import {
  MultiStepFormStepperContextFields,
  MultiStepFormStepsContextFields,
} from "./types";

export const MultiStepFormStepsContext =
  createContext<MultiStepFormStepsContextFields>({
    activeStepIndex: 0,
    reportStepValidity: (_: boolean) => undefined,
    handleStepSubmit:
      <T>(onFormStepSubmit: (formStepData: T) => void) =>
      (formStepData: T) =>
        onFormStepSubmit(formStepData),
  });

export const MultiStepFormStepperContext =
  createContext<MultiStepFormStepperContextFields>({
    formSteps: [],
    activeStepIndex: 0,
    onChangeStep: (_: number) => undefined,
    steppingDisabled: true,
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
