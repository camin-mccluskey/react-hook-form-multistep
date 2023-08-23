import type { FieldValues } from 'react-hook-form'
import { useMultiStepFormContext } from './MultiStepFormContext'
import type { MultiStepFormStepRenderFunction } from './types'

export type MultiStepFormStepProps<StepFormData extends FieldValues> = {
  renderStepForm: MultiStepFormStepRenderFunction<StepFormData>
  name?: string
  formStepIndex?: number
}

export default function MultiStepFormStep<StepFormData extends FieldValues>({
  renderStepForm,
  formStepIndex,
}: MultiStepFormStepProps<StepFormData>) {
  const {
    stepsContext: { activeStepIndex, reportStepValidity, handleStepSubmit },
  } = useMultiStepFormContext()

  return formStepIndex === activeStepIndex
    ? // render step's child form
      renderStepForm({
        reportStepValidity,
        handleStepSubmit,
      })
    : null
}
