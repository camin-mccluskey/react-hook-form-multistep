import React from 'react';
import { useContextRef } from 'react-context-refs';
import useMultiStepSubmit from './useMultiStepSubmit';
export default function SubmitButton({ label = 'Next', handleSubmit, onSubmit, disabled, }) {
    const multiStepOnSubmit = useMultiStepSubmit({ handleSubmit, onSubmit });
    const submitButtonRef = useContextRef('submitButton', {
        disabled,
        stepperSubmit: (nextStepIndex) => {
            void multiStepOnSubmit(nextStepIndex);
        },
    });
    return (React.createElement("button", { type: "submit", disabled: disabled, ref: submitButtonRef }, label));
}
//# sourceMappingURL=SubmitButton.js.map