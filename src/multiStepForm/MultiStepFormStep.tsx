import {
  ForwardedRef,
  ReactElement,
  ReactNode,
  RefAttributes,
  forwardRef,
} from "react";
import { DeepPartial, FieldValues } from "react-hook-form";
import { useMultiStepFormContext } from "./MultiStepFormContext";

type FormStepBaseProps<StepFormData extends FieldValues> = {
  ref?: ForwardedRef<HTMLInputElement>;
  data?: DeepPartial<StepFormData>;
  onSubmit: (formData: StepFormData) => void;
  reportValidity: (isValid: boolean) => void;
};

type MultiStepFormStepRenderProp<StepFormData extends FieldValues> = ({
  reportStepValidity,
  handleStepSubmit,
}: {
  ref?: ForwardedRef<HTMLInputElement>;
  reportStepValidity: (isFormStepValid: boolean) => void;
  handleStepSubmit: <T>(
    onFormStepSubmit: (formStepData: T) => void
  ) => (formStepData: T) => void;
}) => ReactElement<
  FormStepBaseProps<StepFormData> & RefAttributes<HTMLInputElement>
>;

export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: MultiStepFormStepRenderProp<StepFormData>;
  formStepIndex?: number;
};

const MultiStepFormStep = forwardRef(function MultiStepFormStep<
  StepFormData extends FieldValues
>(
  { renderStepForm, formStepIndex }: MultiStepFormStepProps<StepFormData>,
  ref: ForwardedRef<HTMLInputElement>
): ReactNode {
  const {
    stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit },
  } = useMultiStepFormContext();
  return formStepIndex === activeStepIndex
    ? renderStepForm({ ref, reportStepValidity, handleStepSubmit })
    : null;
});

MultiStepFormStep.displayName = "MultiStepFormStep";
export default MultiStepFormStep;
