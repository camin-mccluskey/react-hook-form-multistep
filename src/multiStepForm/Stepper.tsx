import { FormStep } from "./types";

type BasicStepperProps = {
  formSteps: FormStep[];
  activeStepIndex: number;
  steppingDisabled: boolean;
  onChangeStep: (stepIdx: number) => void;
};
export default function BasicStepper({
  formSteps,
  activeStepIndex,
  steppingDisabled,
  onChangeStep,
}: BasicStepperProps) {
  const widthPc = (100 / formSteps.length).toFixed();
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
      {formSteps.map((step, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column" }}>
          <div
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
          <p>{step.name}</p>
        </div>
      ))}
    </div>
  );
}
