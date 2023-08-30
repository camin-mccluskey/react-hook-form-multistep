# React Hook Form Multi-Step

[![npm version](https://badge.fury.io/js/react-hook-form-multistep.svg)](https://badge.fury.io/js/react-hook-form-multistep)

Create react-hook-forms with multistep functionality.

- ✅ Bring your existing forms using react-hook-form.
- 🚶 Use the stepper component to visualise form progress (or bring your own).
- 💾 Save the state of your form as the user progresses.
- ⛔️ Provides feedback when the form is in invalid state, blocking progress.
- 📃 Unstyled. As this is just a wrapper around your own forms.

## Getting Started

Install react-hook-form-multistep

```
npm install react-hook-form-multistep
```

Check out the `/examples` for simple and complex (custom stepper, controlled components) usage. As a quick primer, here is a very simple example where each form takes in 1 piece of the state, updates it and writes it back to the state variable, provided the data in the form is valid.

```typescript
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import MultiStepForm from 'react-hook-form-multistep'

function App() {
  const [state, setState] = useState<FormOneData & FormTwoData>({
    name: 'joe',
    age: '18',
  })

  return (
    <MultiStepForm>
      <MultiStepForm.Step
        renderStepForm={({ handleStepSubmit, reportStepValidity }) => (
          <FormOne
            data={state}
            onSubmit={handleStepSubmit((data) => setState({ ...data, ...state }))} // handleStepSubmit(data: FormOneData) => void)
            reportStepValidity={reportStepValidity} // (isFormStepValid: boolean) => void
          />
        )}
      />
      <MultiStepForm.Step
        renderStepForm={({ handleStepSubmit, reportStepValidity }) => (
          <FormTwo
            data={state}
            onSubmit={handleStepSubmit((data) => setState({ ...data, ...state }))}
            reportStepValidity={reportStepValidity}
          />
        )}
      />
    </MultiStepForm>
  )
}

// FormOne and FormTwo are simple react-hook-forms
```

## Complex forms

For complex forms with deeply nested fields, and particularly ones with [useFieldArray](https://www.react-hook-form.com/api/usefieldarray/) the simple `setState({ ...data, ...state })` approach to saving each form step will not work. `setState` does a shallow merge of object properties. The snippet below is a helper which will deeply merge object properties and handles array inputs properly (i.e. overwriting the existing array with the new array in the submitted form step).

```typescript
// utility function
import mergeWith from 'lodash.mergewith'
import { type DeepPartial } from 'react-hook-form'

export default function mergeFormState<T extends object>(object: T, source: DeepPartial<T>): T {
  return mergeWith({}, object, source, replaceArrayOnMerge)
}

const replaceArrayOnMerge = <T,>(objValue: T, srcValue: DeepPartial<T>) => {
  if (Array.isArray(objValue)) {
    return srcValue
  }
}

// useage
...
<FormOne
    data={store}
    onSubmit={handleStepSubmit((data) => setState((prevStore) => mergeFormState(prevStore, data)))}
    reportStepValidity={reportStepValidity}
/>
...
```
