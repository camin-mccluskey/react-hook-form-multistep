"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function BasicStepper({ formSteps, activeStepIndex, steppingDisabled, onChangeStep, }) {
    const widthPc = (100 / formSteps.length).toFixed();
    return (react_1.default.createElement("div", { style: {
            width: '100%',
            paddingBottom: '8px',
            height: '16px',
            display: 'flex',
            flexDirection: 'row',
        } }, formSteps.map((step, index) => (react_1.default.createElement("div", { key: index, style: { display: 'flex', flexDirection: 'column' } },
        react_1.default.createElement("div", { style: {
                margin: '5px',
                width: `${widthPc}%`,
                height: '100%',
                backgroundColor: index === activeStepIndex ? 'blue' : steppingDisabled ? 'black' : 'gray',
            }, onClick: () => onChangeStep(index) }),
        react_1.default.createElement("p", null, step.name))))));
}
exports.default = BasicStepper;
//# sourceMappingURL=Stepper.js.map