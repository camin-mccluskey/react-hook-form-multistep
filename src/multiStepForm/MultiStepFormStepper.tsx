import {
  MultiStepFormStepperContextProps,
  useMultiStepFormContext,
} from "./MultiStepFormContext";
import Stepper from "./Stepper";

type MultiStepFormStepperProps = {
  render?: ({
    numSteps,
    activeStepIndex,
    onChangeStep,
    steppingDisabled,
  }: MultiStepFormStepperContextProps) => JSX.Element;
};

export default function MultiStepFormStepper({
  render,
}: MultiStepFormStepperProps) {
  const { stepperContext } = useMultiStepFormContext();
  const { numSteps, activeStepIndex, onChangeStep, steppingDisabled } =
    stepperContext;
  return render ? (
    render(stepperContext)
  ) : (
    <Stepper
      numSteps={numSteps}
      currentStepIndex={activeStepIndex}
      onChangeStep={onChangeStep}
      steppingDisabled={steppingDisabled}
    />
  );
}
