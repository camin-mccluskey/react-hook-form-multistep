import { useMultiStepFormContext } from "./MultiStepFormContext";
import Stepper from "./Stepper";
import { MultiStepFormStepperContextFields } from "./types";

type MultiStepFormStepperProps = {
  render?: ({
    formSteps,
    activeStepIndex,
    onChangeStep,
    steppingDisabled,
  }: MultiStepFormStepperContextFields) => JSX.Element;
};

export default function MultiStepFormStepper({
  render,
}: MultiStepFormStepperProps) {
  const { stepperContext } = useMultiStepFormContext();
  const { formSteps, activeStepIndex, onChangeStep, steppingDisabled } =
    stepperContext;
  return render ? (
    render(stepperContext)
  ) : (
    <Stepper
      formSteps={formSteps}
      activeStepIndex={activeStepIndex}
      onChangeStep={onChangeStep}
      steppingDisabled={steppingDisabled}
    />
  );
}
