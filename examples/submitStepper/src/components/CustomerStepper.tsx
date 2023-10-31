import { type FormStep } from 'react-hook-form-multistep'

type CustomStepperProps = {
  formSteps: FormStep[]
  activeStepIndex: number
  steppingDisabled: boolean
  onChangeStep: (stepIdx: number) => void
}

export default function CustomStepper({
  formSteps,
  activeStepIndex,
  steppingDisabled,
  onChangeStep,
}: CustomStepperProps) {
  return (
    <div
      style={{
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
      }}
    >
      {formSteps.map((step, index) => {
        const isCurrentStep = index === activeStepIndex
        const isStepBeforeCurrent = index < activeStepIndex
        let circleColor = 'transparent'
        if (isCurrentStep) {
          circleColor = 'green'
        } else if (isStepBeforeCurrent) {
          circleColor = 'orange'
        }

        if (steppingDisabled && !isCurrentStep) {
          circleColor = 'black'
        }

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <div
              className="step"
              style={{
                borderRadius: '50%',
                border: '1px solid black',
                width: '20px',
                height: '20px',
                backgroundColor: circleColor,
              }}
              onClick={() => onChangeStep(index)}
            />
            <p style={{ fontSize: '10px' }}>{step.name}</p>
          </div>
        )
      })}
    </div>
  )
}
