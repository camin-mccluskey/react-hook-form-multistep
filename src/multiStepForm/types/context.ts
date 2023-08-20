import { FormStep } from "./form";

export type MultiStepFormStepsContextFields = {
  activeStepIndex: number;
  reportStepValidity: (isFormStepValid: boolean) => void;
  handleStepSubmit: <T>(
    onFormStepSubmit: (formStepData: T) => void
  ) => (formStepData: T) => void;
};

export type MultiStepFormStepperContextFields = {
  formSteps: FormStep[];
  activeStepIndex: number;
  onChangeStep: (newStepIndex: number) => void;
  steppingDisabled: boolean;
};
