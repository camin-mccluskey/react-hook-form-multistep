type CustomStepperProps = {
  numSteps: number;
  activeStepIndex: number;
  steppingDisabled: boolean;
  onChangeStep: (stepIdx: number) => void;
};

export default function CustomStepper({
  numSteps,
  activeStepIndex,
  steppingDisabled,
  onChangeStep,
}: CustomStepperProps) {
  const steps = Array.from({ length: numSteps });

  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      {steps.map((_, index) => {
        const isCurrentStep = index === activeStepIndex;
        const isStepBeforeCurrent = index < activeStepIndex;
        let circleColor = "transparent";
        if (isCurrentStep) {
          circleColor = "green";
        } else if (isStepBeforeCurrent) {
          circleColor = "orange";
        }

        if (steppingDisabled && !isCurrentStep) {
          circleColor = "black";
        }

        return (
          <div
            key={index}
            className="step"
            style={{
              borderRadius: "50%",
              border: "1px solid white",
              width: "20px",
              height: "20px",
              backgroundColor: circleColor,
            }}
            onClick={() => onChangeStep(index)}
          />
        );
      })}
    </div>
  );
}
