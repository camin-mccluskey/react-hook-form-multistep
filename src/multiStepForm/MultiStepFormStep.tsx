import { ReactElement, ReactNode } from "react";
import { DeepPartial, FieldValues } from "react-hook-form";
import { useMultiStepFormContext } from "./MultiStepFormContext";

type FormStepBaseProps<StepFormData extends FieldValues> = {
  data?: DeepPartial<StepFormData>;
  onSubmit: (formData: StepFormData) => void;
  reportValidity: (isValid: boolean) => void;
};

export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: ({
    reportStepValidity,
    handleStepSubmit,
  }: {
    reportStepValidity: (isFormStepValid: boolean) => void;
    handleStepSubmit: <T>(
      onFormStepSubmit: (formStepData: T) => void
    ) => (formStepData: T) => void;
  }) => ReactElement<FormStepBaseProps<StepFormData>>;
  formStepIndex?: number;
};

export default function MultiStepFormStep<StepFormData extends FieldValues>({
  renderStepForm,
  formStepIndex,
}: MultiStepFormStepProps<StepFormData>): ReactNode {
  const {
    stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit },
  } = useMultiStepFormContext();
  return formStepIndex === activeStepIndex
    ? renderStepForm({ reportStepValidity, handleStepSubmit })
    : null;
}
