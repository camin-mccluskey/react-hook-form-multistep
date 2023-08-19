import { useContextRef } from "react-context-refs";

type SubmitButtonProps = {
  onSubmit: () => void;
  disabled: boolean;
};

export default function SubmitButton({
  onSubmit,
  disabled,
}: SubmitButtonProps) {
  const submitButtonRef = useContextRef("submitButton", {
    disabled,
    stepperSubmit: onSubmit,
  });

  return (
    <button type="submit" disabled={disabled} ref={submitButtonRef}>
      Submit
    </button>
  );
}
