"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MultiStepFormContext_1 = require("./MultiStepFormContext");
function MultiStepFormStep({ renderStepForm, formStepIndex, }) {
    const { stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit }, } = (0, MultiStepFormContext_1.useMultiStepFormContext)();
    return formStepIndex === activeStepIndex
        ? // render step's child form
            renderStepForm({
                reportStepValidity,
                handleStepSubmit,
            })
        : null;
}
exports.default = MultiStepFormStep;
//# sourceMappingURL=MultiStepFormStep.js.map