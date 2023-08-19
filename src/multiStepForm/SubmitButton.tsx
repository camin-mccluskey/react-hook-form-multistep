import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";

export type MultiStepFormSubmitButtonRefProps = {
  onSubmit: (afterSubmit: () => void) => void;
  click: () => void;
};

type SubmitButtonProps = {
  onSubmit: () => void;
  disabled: boolean;
};

const SubmitButton = forwardRef(function SubmitButton(
  { onSubmit, disabled }: SubmitButtonProps,
  ref: ForwardedRef<MultiStepFormSubmitButtonRefProps>
) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      onSubmit: (afterSubmit: () => void) => {
        console.log("hit");
        onSubmit();
        submitButtonRef.current?.click();
        // afterSubmit();
      },
      click: () => {
        console.log("something");
      },
    }),
    [onSubmit]
  );

  return (
    <button type="submit" disabled={disabled} ref={submitButtonRef}>
      Submit
    </button>
  );
});

SubmitButton.displayName = "SubmitButton";
export default SubmitButton;
