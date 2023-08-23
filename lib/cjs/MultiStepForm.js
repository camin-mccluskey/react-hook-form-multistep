"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const MultiStepFormStep_1 = __importDefault(require("./MultiStepFormStep"));
const MultiStepFormStepper_1 = __importDefault(require("./MultiStepFormStepper"));
const MultiStepFormContext_1 = require("./MultiStepFormContext");
const react_context_refs_1 = require("react-context-refs");
function MultiStepForm({ children, }) {
    return (react_1.default.createElement(react_context_refs_1.RefProvider, null,
        react_1.default.createElement(MultiStepFormContent, null, children)));
}
function MultiStepFormContent({ children, }) {
    const arrayStepChildren = react_2.Children.toArray(children);
    const formSteps = react_2.Children.map(arrayStepChildren, (child) => child.type === MultiStepFormStep_1.default ? child : undefined)
        .filter((child) => child !== undefined)
        .map((child) => {
        const step = child;
        return {
            name: step.props.name,
        };
    });
    const includesStepper = arrayStepChildren.length > formSteps.length;
    const numSteps = formSteps.length;
    const [activeStepIndex, setActiveStepIndex] = (0, react_2.useState)(0);
    const [isFormValid, setIsFormValid] = (0, react_2.useState)(false);
    const submitButtonRefs = (0, react_context_refs_1.useRefs)('submitButton');
    if (submitButtonRefs.length > 1) {
        throw new Error('MultiStepForm must have exactly 1 submit button active.');
    }
    const onChangeStep = (0, react_2.useCallback)((newStepIndex) => {
        if (isFormValid) {
            submitButtonRefs[0]?.meta?.stepperSubmit(newStepIndex);
            // this is necessary (even though the above will navigate) to ensure form steps w/o submit buttons are navigated
            setActiveStepIndex(newStepIndex);
        }
    }, [submitButtonRefs, isFormValid]);
    const handleStepSubmit = (0, react_2.useCallback)((onFormSubmit) => {
        return (formData, _, nextStepIndex = Math.min(activeStepIndex + 1, numSteps - 1)) => {
            onFormSubmit(formData);
            setActiveStepIndex(nextStepIndex);
        };
    }, [activeStepIndex, numSteps]);
    const reportStepValidity = (0, react_2.useCallback)((isFormStepValid) => setIsFormValid(isFormStepValid), []);
    const stepsContextValue = (0, react_2.useMemo)(() => ({
        activeStepIndex,
        reportStepValidity,
        handleStepSubmit,
    }), [activeStepIndex, handleStepSubmit, reportStepValidity]);
    const stepperContextValue = (0, react_2.useMemo)(() => ({
        formSteps,
        numSteps,
        activeStepIndex,
        onChangeStep,
        steppingDisabled: !isFormValid,
    }), [activeStepIndex, isFormValid, formSteps, numSteps, onChangeStep]);
    return (react_1.default.createElement(MultiStepFormContext_1.MultiStepFormStepperContext.Provider, { value: stepperContextValue },
        react_1.default.createElement(MultiStepFormContext_1.MultiStepFormStepsContext.Provider, { value: stepsContextValue },
            react_1.default.createElement("div", { style: { height: '100%', width: '100%' } }, react_2.Children.map(arrayStepChildren, (child, index) => {
                const item = child;
                switch (item.type) {
                    case MultiStepFormStep_1.default:
                        return (0, react_2.cloneElement)(item, {
                            formStepIndex: includesStepper ? index - 1 : index,
                        });
                    case MultiStepFormStepper_1.default:
                        return child;
                    default:
                        console.error('Unhandled item type:', item.type);
                        return child;
                }
            })))));
}
MultiStepForm.Step = MultiStepFormStep_1.default;
MultiStepForm.Stepper = MultiStepFormStepper_1.default;
exports.default = MultiStepForm;
//# sourceMappingURL=MultiStepForm.js.map