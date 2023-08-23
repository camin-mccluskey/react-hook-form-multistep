"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MultiStepFormContext_1 = require("./MultiStepFormContext");
const Stepper_1 = __importDefault(require("./Stepper"));
function MultiStepFormStepper({ render }) {
    const { stepperContext } = (0, MultiStepFormContext_1.useMultiStepFormContext)();
    const { formSteps, activeStepIndex, onChangeStep, steppingDisabled } = stepperContext;
    return render ? (render(stepperContext)) : (react_1.default.createElement(Stepper_1.default, { formSteps: formSteps, activeStepIndex: activeStepIndex, onChangeStep: onChangeStep, steppingDisabled: steppingDisabled }));
}
exports.default = MultiStepFormStepper;
//# sourceMappingURL=MultiStepFormStepper.js.map