"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_context_refs_1 = require("react-context-refs");
const useMultiStepSubmit_1 = __importDefault(require("./useMultiStepSubmit"));
function SubmitButton({ label = 'Next', handleSubmit, onSubmit, disabled, }) {
    const multiStepOnSubmit = (0, useMultiStepSubmit_1.default)({ handleSubmit, onSubmit });
    const submitButtonRef = (0, react_context_refs_1.useContextRef)('submitButton', {
        disabled,
        stepperSubmit: (nextStepIndex) => {
            void multiStepOnSubmit(nextStepIndex);
        },
    });
    return (react_1.default.createElement("button", { type: "submit", disabled: disabled, ref: submitButtonRef }, label));
}
exports.default = SubmitButton;
//# sourceMappingURL=SubmitButton.js.map