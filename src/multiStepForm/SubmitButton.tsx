import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { useContextRef } from "react-context-refs";

export type MultiStepFormSubmitButtonRefProps = {
  onSubmit: (afterSubmit: () => void) => void;
  click: () => void;
};

type SubmitButtonProps = {
  onSubmit: () => void;
  disabled: boolean;
};

export default function SubmitButton({
  onSubmit,
  disabled,
}: SubmitButtonProps) {
  // const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useContextRef("submitButton", {
    disabled,
    onSubmit,
    test: () => console.log("test method"),
  });
  // useImperativeHandle(submitButtonRef, () => ({
  //   test: () => {
  //     console.log("test imperative ");
  //     // onSubmit();
  //     // afterSubmit();
  //   },
  // }));

  return (
    <button type="submit" disabled={disabled} ref={submitButtonRef}>
      Submit
    </button>
  );
}
