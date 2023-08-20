import { FieldValues } from "react-hook-form";
import { useMultiStepFormContext } from "./MultiStepFormContext";
import { MultiStepFormStepRenderFunction } from "./types";

export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: MultiStepFormStepRenderFunction<StepFormData>;
  name?: string;
  formStepIndex?: number;
};

export default function MultiStepFormStep<StepFormData extends FieldValues>({
  renderStepForm,
  formStepIndex,
}: MultiStepFormStepProps<StepFormData>) {
  const {
    stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit },
  } = useMultiStepFormContext();

  return formStepIndex === activeStepIndex
    ? // render step's child form
      renderStepForm({
        reportStepValidity,
        // React does not allow for generic context types, so we can't specific the data passed to the onSubmit function inside handleStepSubmit is of type StepFormData
        //  this is not really an issue as the onSubmit function can only be called when the form is valid, so the data passed to it will always be of type StepFormData
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleStepSubmit,
      })
    : null;
}
