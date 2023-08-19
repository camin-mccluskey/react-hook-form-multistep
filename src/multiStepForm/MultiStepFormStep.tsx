import {
  ForwardedRef,
  ReactElement,
  ReactNode,
  RefAttributes,
  forwardRef,
} from "react";
import { DeepPartial, FieldValues } from "react-hook-form";
import { useMultiStepFormContext } from "./MultiStepFormContext";
import { MultiStepFormSubmitButtonRefProps } from "./SubmitButton";

type FormStepBaseProps<StepFormData extends FieldValues> = {
  data?: DeepPartial<StepFormData>;
  onSubmit: (formData: StepFormData) => void;
  reportValidity: (isValid: boolean) => void;
};

type MultiStepFormStepRenderFunction<StepFormData extends FieldValues> = ({
  reportStepValidity,
  handleStepSubmit,
}: {
  reportStepValidity: (isFormStepValid: boolean) => void;
  handleStepSubmit: <T>(
    onFormStepSubmit: (formStepDate: T) => void
  ) => (formStepData: T) => void;
}) => ReactElement<FormStepBaseProps<StepFormData>>;

export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: MultiStepFormStepRenderFunction<StepFormData>;
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
    ? // render step's child form
      renderStepForm({
        reportStepValidity,
        handleStepSubmit,
      })
    : null;
}
