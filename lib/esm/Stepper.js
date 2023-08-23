import React from 'react';
export default function BasicStepper({ formSteps, activeStepIndex, steppingDisabled, onChangeStep, }) {
    const widthPc = (100 / formSteps.length).toFixed();
    return (React.createElement("div", { style: {
            width: '100%',
            paddingBottom: '8px',
            height: '16px',
            display: 'flex',
            flexDirection: 'row',
        } }, formSteps.map((step, index) => (React.createElement("div", { key: index, style: { display: 'flex', flexDirection: 'column' } },
        React.createElement("div", { style: {
                margin: '5px',
                width: `${widthPc}%`,
                height: '100%',
                backgroundColor: index === activeStepIndex ? 'blue' : steppingDisabled ? 'black' : 'gray',
            }, onClick: () => onChangeStep(index) }),
        React.createElement("p", null, step.name))))));
}
//# sourceMappingURL=Stepper.js.map