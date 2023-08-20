type BasicStepperProps = {
  numSteps: number;
  activeStepIndex: number;
  steppingDisabled: boolean;
  onChangeStep: (stepIdx: number) => void;
};
export default function BasicStepper({
  numSteps,
  activeStepIndex,
  steppingDisabled,
  onChangeStep,
}: BasicStepperProps) {
  const widthPc = (100 / numSteps).toFixed();
  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "8px",
        height: "16px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {Array.from({ length: numSteps }, (_, index) => (
        <div
          key={index}
          style={{
            margin: "5px",
            width: `${widthPc}%`,
            height: "100%",
            backgroundColor:
              index === activeStepIndex
                ? "blue"
                : steppingDisabled
                ? "black"
                : "gray",
          }}
          onClick={() => onChangeStep(index)}
        />
      ))}
    </div>
  );
}
