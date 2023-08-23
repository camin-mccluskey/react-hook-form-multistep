import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import type { FormStepOnSubmit } from './types'

type UseMultiStepSubmitProps<StepFormData extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<StepFormData>
  onSubmit: FormStepOnSubmit<StepFormData>
}

const useMultiStepSubmit = <StepFormData extends FieldValues>({
  handleSubmit,
  onSubmit,
}: UseMultiStepSubmitProps<StepFormData>) => {
  return (nextStepIndex?: number) => {
    return handleSubmit(
      (data, e) => onSubmit(data, e, nextStepIndex),
      (errors) => {
        console.log('errors', errors)
      },
    )()
  }
}

export default useMultiStepSubmit
