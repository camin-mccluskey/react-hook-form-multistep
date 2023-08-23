"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultiStepFormContext = exports.MultiStepFormStepperContext = exports.MultiStepFormStepsContext = void 0;
const react_1 = require("react");
exports.MultiStepFormStepsContext = (0, react_1.createContext)({
    activeStepIndex: 0,
    reportStepValidity: (_) => undefined,
    handleStepSubmit: (onFormStepSubmit) => (formStepData) => onFormStepSubmit(formStepData),
});
exports.MultiStepFormStepperContext = (0, react_1.createContext)({
    formSteps: [],
    activeStepIndex: 0,
    onChangeStep: (_) => undefined,
    steppingDisabled: true,
});
function useMultiStepFormContext() {
    const stepsContext = (0, react_1.useContext)(exports.MultiStepFormStepsContext);
    const stepperContext = (0, react_1.useContext)(exports.MultiStepFormStepperContext);
    if (!stepsContext || !stepperContext) {
        throw new Error(`MultiStepForm components cannot be rendered outside the MultiStepForm component`);
    }
    return { stepsContext, stepperContext };
}
exports.useMultiStepFormContext = useMultiStepFormContext;
//# sourceMappingURL=MultiStepFormContext.js.map