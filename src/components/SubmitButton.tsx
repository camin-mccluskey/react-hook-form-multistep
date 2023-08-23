import React from 'react'
import { useContextRef } from 'react-context-refs'
import useMultiStepSubmit from '@hooks/useMultiStepSubmit'
import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import type { FormStepOnSubmit } from '~/types'

type SubmitButtonProps<StepFormData extends FieldValues> = {
  label?: string
  className?: string
  handleSubmit: UseFormHandleSubmit<StepFormData>
  onSubmit: FormStepOnSubmit<StepFormData>
  disabled: boolean
}

export default function SubmitButton<StepFormData extends FieldValues>({
  label = 'Next',
  className,
  handleSubmit,
  onSubmit,
  disabled,
}: SubmitButtonProps<StepFormData>) {
  const multiStepOnSubmit = useMultiStepSubmit({ handleSubmit, onSubmit })
  const submitButtonRef = useContextRef('submitButton', {
    disabled,
    stepperSubmit: (nextStepIndex: number) => {
      void multiStepOnSubmit(nextStepIndex)
    },
  })

  return (
    <button type="submit" className={className} disabled={disabled} ref={submitButtonRef}>
      {label}
    </button>
  )
}
