import { FieldValues } from "react-hook-form";
import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import MultiStepFormStep, { MultiStepFormStepProps } from "./MultiStepFormStep";
import MultiStepFormStepper from "./MultiStepFormStepper";
import {
  MultiStepFormStepperContext,
  MultiStepFormStepsContext,
} from "./MultiStepFormContext";
import { RefProvider, useRefs } from "react-context-refs";

export type MultiStepFormProps<ParentFormData extends FieldValues> = {
  children:
    | ReactElement<MultiStepFormStepProps<Partial<ParentFormData>>>
    | ReactElement<MultiStepFormStepProps<Partial<ParentFormData>>>[];
};

function MultiStepForm<ParentFormData extends FieldValues>({
  children,
}: MultiStepFormProps<ParentFormData>) {
  return (
    <RefProvider>
      <MultiStepFormContent>{children}</MultiStepFormContent>
    </RefProvider>
  );
}

function MultiStepFormContent<ParentFormData extends FieldValues>({
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

  const submitButtonRefs = useRefs("submitButton");
  if (submitButtonRefs.length > 1) {
    throw new Error("MultiStepForm must have exactly 1 submit button active.");
  }
  const onChangeStep = useCallback(
    (newStepIndex: number) => {
      console.log("newStepIndex", newStepIndex);
      if (isFormValid) {
        submitButtonRefs.at(0)?.meta?.stepperSubmit(newStepIndex);
        // this is necessary (even though the above will navigate) to ensure form steps w/o submit buttons are navigated
        setActiveStepIndex(newStepIndex);
      }
    },
    [submitButtonRefs, isFormValid]
  );

  const handleStepSubmit = useCallback(
    <T,>(onFormSubmit: (formData: T) => void) => {
      return (
        formData: T,
        event?: React.BaseSyntheticEvent<object, any, any>,
        nextStepIndex = Math.min(activeStepIndex + 1, numSteps - 1)
      ) => {
        console.log(formData, event, nextStepIndex);
        onFormSubmit(formData);
        setActiveStepIndex(nextStepIndex);
      };
    },
    [activeStepIndex, arrayStepChildren]
  );

  const reportStepValidity = useCallback(
    (isFormStepValid: boolean) => setIsFormValid(isFormStepValid),
    []
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

MultiStepForm.Step = MultiStepFormStep;
MultiStepForm.Stepper = MultiStepFormStepper;
export default MultiStepForm;
