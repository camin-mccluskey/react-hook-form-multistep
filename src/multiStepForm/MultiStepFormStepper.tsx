import { useMultiStepFormContext } from "./MultiStepFormContext";
import Stepper from "./Stepper";

export default function MultiStepFormStepper() {
  const {
    stepperContext: {
      numSteps,
      activeStepIndex,
      onChangeStep,
      steppingDisabled,
    },
  } = useMultiStepFormContext();
  return (
    <Stepper
      numSteps={numSteps}
      currentStepIndex={activeStepIndex}
      onChangeStep={onChangeStep}
      steppingDisabled={steppingDisabled}
    />
  );
}
