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
  ref?: ForwardedRef<MultiStepFormSubmitButtonRefProps>;
  data?: DeepPartial<StepFormData>;
  onSubmit: (formData: StepFormData) => void;
  reportValidity: (isValid: boolean) => void;
};

type MultiStepFormStepRenderFunction<StepFormData extends FieldValues> = ({
  ref,
  reportStepValidity,
  handleStepSubmit,
}: {
  ref?: ForwardedRef<MultiStepFormSubmitButtonRefProps>;
  reportStepValidity: (isFormStepValid: boolean) => void;
  handleStepSubmit: <T>(
    onFormStepSubmit: (formStepData: T) => void
  ) => (formStepData: T) => void;
}) => ReactElement<
  FormStepBaseProps<StepFormData> &
    RefAttributes<MultiStepFormSubmitButtonRefProps>
>;

export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: MultiStepFormStepRenderFunction<StepFormData>;
  formStepIndex?: number;
};

const MultiStepFormStep = forwardRef(function MultiStepFormStep<
  StepFormData extends FieldValues
>(
  { renderStepForm, formStepIndex }: MultiStepFormStepProps<StepFormData>,
  ref: ForwardedRef<MultiStepFormSubmitButtonRefProps>
): ReactNode {
  const {
    stepsContext: {
      submitRef,
      activeStepIndex,
      reportStepValidity,
      handleStepSubmit,
    },
  } = useMultiStepFormContext();
  console.log("context submitRef:", submitRef);

  return formStepIndex === activeStepIndex
    ? // render step's child form
      renderStepForm({
        ref: submitRef,
        reportStepValidity,
        handleStepSubmit,
      })
    : null;
});

MultiStepFormStep.displayName = "MultiStepFormStep";
export default MultiStepFormStep;
