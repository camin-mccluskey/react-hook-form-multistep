import { useMultiStepFormContext } from './MultiStepFormContext';
export default function MultiStepFormStep({ renderStepForm, formStepIndex, }) {
    const { stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit }, } = useMultiStepFormContext();
    return formStepIndex === activeStepIndex
        ? // render step's child form
            renderStepForm({
                reportStepValidity,
                handleStepSubmit,
            })
        : null;
}
//# sourceMappingURL=MultiStepFormStep.js.map