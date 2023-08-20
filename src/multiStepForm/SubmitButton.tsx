import { useContextRef } from "react-context-refs";

type SubmitButtonProps = {
  label?: string;
  onSubmit: (nextStepIndex?: number) => void;
  disabled: boolean;
};

export default function SubmitButton({
  label = "Next",
  onSubmit,
  disabled,
}: SubmitButtonProps) {
  const submitButtonRef = useContextRef("submitButton", {
    disabled,
    stepperSubmit: (nextStepIndex: number) => {
      onSubmit(nextStepIndex);
    },
  });

  return (
    <button type="submit" disabled={disabled} ref={submitButtonRef}>
      {label}
    </button>
  );
}
