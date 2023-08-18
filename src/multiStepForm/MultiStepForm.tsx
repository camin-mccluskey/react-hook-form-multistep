import { DeepPartial, FieldValues } from "react-hook-form";
import Stepper from "./Stepper";
import {
  Children,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type MultiStepFormStepsContextProps = {
  activeStepIndex: number;
  reportStepValidity: (isFormStepValid: boolean) => void;
  handleStepSubmit: <T>(
    onFormStepSubmit: (formStepData: T) => void
  ) => (formStepData: T) => void;
};

const MultiStepFormStepsContext = createContext<MultiStepFormStepsContextProps>(
  {
    activeStepIndex: 0,
    reportStepValidity: (_: boolean) => undefined,
    handleStepSubmit:
      <T,>(onFormStepSubmit: (formStepData: T) => void) =>
      (formStepData: T) =>
        onFormStepSubmit(formStepData),
  }
);

type MultiStepFormStepperContextProps = {
  numSteps: number;
  activeStepIndex: number;
  onChangeStep: (newStepIndex: number) => void;
  canStep: boolean;
};

const MultiStepFormStepperContext =
  createContext<MultiStepFormStepperContextProps>({
    numSteps: 0,
    activeStepIndex: 0,
    onChangeStep: (_: number) => undefined,
    canStep: false,
  });

function useMultiStepFormContext() {
  const stepsContext = useContext(MultiStepFormStepsContext);
  const stepperContext = useContext(MultiStepFormStepperContext);
  if (!stepsContext || !stepperContext) {
    throw new Error(
      `MultiStepForm components cannot be rendered outside the MultiStepForm component`
    );
  }
  return { stepsContext, stepperContext };
}

// todo probably need a generic here
export type MultiStepFormProps<ParentFormData extends FieldValues> = {
  children:
    | ReactElement<MultiStepFormStepProps<Partial<ParentFormData>>>
    | ReactElement<MultiStepFormStepProps<Partial<ParentFormData>>>[];
};

function MultiStepForm<ParentFormData extends FieldValues>({
  children,
}: MultiStepFormProps<ParentFormData>) {
  const arrayStepChildren = Children.toArray(children);
  const includesStepper = Children.map(
    arrayStepChildren,
    (child) => child
  ).some((child) => (child as ReactElement).type === MultiStepFormStepper);
  const numSteps = arrayStepChildren.length - (includesStepper ? 1 : 0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const onChangeStep = useCallback(
    (newStepIndex: number) => {
      if (isFormValid) {
        setActiveStepIndex(newStepIndex);
      }
    },
    [isFormValid]
  );
  const reportStepValidity = useCallback(
    (isFormStepValid: boolean) => setIsFormValid(isFormStepValid),
    []
  );
  const handleStepSubmit = useCallback(
    <T,>(onFormSubmit: (formData: T) => void) => {
      return (formData: T) => {
        onFormSubmit(formData);
        onChangeStep(Math.min(activeStepIndex + 1, numSteps - 1));
      };
    },
    [activeStepIndex, arrayStepChildren]
  );

  const stepsContextValue = useMemo(
    () => ({
      activeStepIndex,
      reportStepValidity,
      handleStepSubmit,
    }),
    [activeStepIndex, reportStepValidity, handleStepSubmit]
  );

  const stepperContextValue = useMemo(
    () => ({
      numSteps,
      activeStepIndex,
      onChangeStep,
      canStep: !isFormValid,
    }),
    [numSteps, activeStepIndex, onChangeStep, isFormValid]
  );

  return (
    <MultiStepFormStepperContext.Provider value={stepperContextValue}>
      <MultiStepFormStepsContext.Provider value={stepsContextValue}>
        <div style={{ height: "100%", width: "100%" }}>
          {Children.map(arrayStepChildren, (child, index) => {
            const item = child as ReactElement<
              PropsWithChildren<MultiStepFormStepProps<ParentFormData>>
            >;
            switch (item.type) {
              case MultiStepFormStep:
                return cloneElement(item, {
                  formStepIndex: includesStepper ? index - 1 : index,
                });
              case MultiStepFormStepper:
                return child;
              default:
                console.error("Unhandled item type:", item.type);
                return child;
            }
          })}
        </div>
      </MultiStepFormStepsContext.Provider>
    </MultiStepFormStepperContext.Provider>
  );
}

/** Form Child Components */
function MultiStepFormStepper() {
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

// I imagine this will extend the partial of the overall form data
type FormStepBaseProps<StepFormData extends FieldValues> = {
  data?: DeepPartial<StepFormData>;
  onSubmit: (formData: StepFormData) => void;
  reportValidity: (isValid: boolean) => void;
};

type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: ({
    reportStepValidity,
    handleStepSubmit,
  }: {
    reportStepValidity: (isFormStepValid: boolean) => void;
    handleStepSubmit: <T>(
      onFormStepSubmit: (formStepData: T) => void
    ) => (formStepData: T) => void;
  }) => ReactElement<FormStepBaseProps<StepFormData>>;
  formStepIndex?: number;
};

function MultiStepFormStep<StepFormData extends FieldValues>({
  renderStepForm,
  formStepIndex,
}: MultiStepFormStepProps<StepFormData>): ReactNode {
  const {
    stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit },
  } = useMultiStepFormContext();
  return formStepIndex === activeStepIndex
    ? renderStepForm({ reportStepValidity, handleStepSubmit })
    : null;
}

MultiStepForm.Step = MultiStepFormStep;
MultiStepForm.Stepper = MultiStepFormStepper;
export default MultiStepForm;
