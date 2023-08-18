import { useMultiStepFormContext } from "./MultiStepFormContext";
import Stepper from "./Stepper";

export default function MultiStepFormStepper() {
  const {
    stepperContext: { numSteps, activeStepIndex, onChangeStep, canStep },
  } = useMultiStepFormContext();
  return (
    <Stepper
      numSteps={numSteps}
      currentStepIndex={activeStepIndex}
      onChangeStep={onChangeStep}
      disabledStepping={!canStep}
    />
  );
}
