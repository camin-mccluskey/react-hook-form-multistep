import { BaseSyntheticEvent, ReactElement } from "react";
import { DeepPartial, FieldValues } from "react-hook-form";

export type FormStepOnSubmit = <StepFormData extends FieldValues>(
  formData: StepFormData,
  event?: BaseSyntheticEvent,
  nextStepIndex?: number
) => void;

export type FormStepBaseProps<StepFormData extends FieldValues> = {
  data?: DeepPartial<StepFormData>;
  onSubmit: FormStepOnSubmit;
  reportValidity: (isValid: boolean) => void;
};

export type MultiStepFormStepRenderFunction<StepFormData extends FieldValues> =
  ({
    reportStepValidity,
    handleStepSubmit,
  }: {
    reportStepValidity: (isFormStepValid: boolean) => void;
    handleStepSubmit: <T>(
      onFormStepSubmit: (formStepDate: T) => void
    ) => (formStepData: T) => void;
  }) => ReactElement<FormStepBaseProps<StepFormData>>;
