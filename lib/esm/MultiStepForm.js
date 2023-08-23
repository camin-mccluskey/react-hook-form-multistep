import React from 'react';
import { Children, cloneElement, useCallback, useMemo, useState, } from 'react';
import MultiStepFormStep from './MultiStepFormStep';
import MultiStepFormStepper from './MultiStepFormStepper';
import { MultiStepFormStepperContext, MultiStepFormStepsContext } from './MultiStepFormContext';
import { RefProvider, useRefs } from 'react-context-refs';
function MultiStepForm({ children, }) {
    return (React.createElement(RefProvider, null,
        React.createElement(MultiStepFormContent, null, children)));
}
function MultiStepFormContent({ children, }) {
    const arrayStepChildren = Children.toArray(children);
    const formSteps = Children.map(arrayStepChildren, (child) => child.type === MultiStepFormStep ? child : undefined)
        .filter((child) => child !== undefined)
        .map((child) => {
        const step = child;
        return {
            name: step.props.name,
        };
    });
    const includesStepper = arrayStepChildren.length > formSteps.length;
    const numSteps = formSteps.length;
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const submitButtonRefs = useRefs('submitButton');
    if (submitButtonRefs.length > 1) {
        throw new Error('MultiStepForm must have exactly 1 submit button active.');
    }
    const onChangeStep = useCallback((newStepIndex) => {
        if (isFormValid) {
            submitButtonRefs[0]?.meta?.stepperSubmit(newStepIndex);
            // this is necessary (even though the above will navigate) to ensure form steps w/o submit buttons are navigated
            setActiveStepIndex(newStepIndex);
        }
    }, [submitButtonRefs, isFormValid]);
    const handleStepSubmit = useCallback((onFormSubmit) => {
        return (formData, _, nextStepIndex = Math.min(activeStepIndex + 1, numSteps - 1)) => {
            onFormSubmit(formData);
            setActiveStepIndex(nextStepIndex);
        };
    }, [activeStepIndex, numSteps]);
    const reportStepValidity = useCallback((isFormStepValid) => setIsFormValid(isFormStepValid), []);
    const stepsContextValue = useMemo(() => ({
        activeStepIndex,
        reportStepValidity,
        handleStepSubmit,
    }), [activeStepIndex, handleStepSubmit, reportStepValidity]);
    const stepperContextValue = useMemo(() => ({
        formSteps,
        numSteps,
        activeStepIndex,
        onChangeStep,
        steppingDisabled: !isFormValid,
    }), [activeStepIndex, isFormValid, formSteps, numSteps, onChangeStep]);
    return (React.createElement(MultiStepFormStepperContext.Provider, { value: stepperContextValue },
        React.createElement(MultiStepFormStepsContext.Provider, { value: stepsContextValue },
            React.createElement("div", { style: { height: '100%', width: '100%' } }, Children.map(arrayStepChildren, (child, index) => {
                const item = child;
                switch (item.type) {
                    case MultiStepFormStep:
                        return cloneElement(item, {
                            formStepIndex: includesStepper ? index - 1 : index,
                        });
                    case MultiStepFormStepper:
                        return child;
                    default:
                        console.error('Unhandled item type:', item.type);
                        return child;
                }
            })))));
}
MultiStepForm.Step = MultiStepFormStep;
MultiStepForm.Stepper = MultiStepFormStepper;
export default MultiStepForm;
//# sourceMappingURL=MultiStepForm.js.map