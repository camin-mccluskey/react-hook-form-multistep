import { useContextRef } from "react-context-refs";
import useMultiStepSubmit from "./useMultiStepSubmit";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { FormStepOnSubmit } from "./types";

type SubmitButtonProps<StepFormData extends FieldValues> = {
  label?: string;
  handleSubmit: UseFormHandleSubmit<StepFormData>;
  onSubmit: FormStepOnSubmit;
  disabled: boolean;
};

export default function SubmitButton<StepFormData extends FieldValues>({
  label = "Next",
  handleSubmit,
  onSubmit,
  disabled,
}: SubmitButtonProps<StepFormData>) {
  const multiStepOnSubmit = useMultiStepSubmit({ handleSubmit, onSubmit });
  const submitButtonRef = useContextRef("submitButton", {
    disabled,
    stepperSubmit: (nextStepIndex: number) => {
      multiStepOnSubmit(nextStepIndex);
    },
  });

  return (
    <button type="submit" disabled={disabled} ref={submitButtonRef}>
      {label}
    </button>
  );
}
