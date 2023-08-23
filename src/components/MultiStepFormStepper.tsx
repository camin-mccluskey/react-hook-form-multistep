import React from 'react'
import { useMultiStepFormContext } from '@context/MultiStepFormContext'
import Stepper from './Stepper'
import type { MultiStepFormStepperContextFields } from '~/types'

type MultiStepFormStepperProps = {
  render?: ({
    formSteps,
    activeStepIndex,
    onChangeStep,
    steppingDisabled,
  }: MultiStepFormStepperContextFields) => JSX.Element
}

export default function MultiStepFormStepper({ render }: MultiStepFormStepperProps) {
  const { stepperContext } = useMultiStepFormContext()
  const { formSteps, activeStepIndex, onChangeStep, steppingDisabled } = stepperContext
  return render ? (
    render(stepperContext)
  ) : (
    <Stepper
      formSteps={formSteps}
      activeStepIndex={activeStepIndex}
      onChangeStep={onChangeStep}
      steppingDisabled={steppingDisabled}
    />
  )
}
