import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'
import { SubmitButton, type FormStepOnSubmit } from 'react-hook-form-multistep'

export const Animal = {
  DOG: 'DOG',
  CAT: 'CAT',
  BIRD: 'BIRD',
  FISH: 'FISH',
} as const
type Animal = (typeof Animal)[keyof typeof Animal]

export const Handedness = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const
type Handedness = (typeof Handedness)[keyof typeof Handedness]

const stepThreeSchema = z.object({
  other: z.object({
    favouriteAnimal: z.nativeEnum(Animal),
    handedness: z.string(),
    pets: z.array(
      z.object({
        name: z.string().min(1),
        type: z.nativeEnum(Animal),
      }),
    ),
  }),
})

export type StepThreeFormData = z.input<typeof stepThreeSchema>

type StepThreeProps = {
  data?: Partial<StepThreeFormData>
  onSubmit: FormStepOnSubmit<StepThreeFormData>
  reportValidity: (isValid: boolean) => void
}

export default function StepThree({ data, onSubmit, reportValidity }: StepThreeProps) {
  const methods = useForm<StepThreeFormData>({
    defaultValues: data,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(stepThreeSchema),
  })
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = methods

  console.log(errors)
  console.log(watch)

  const {
    fields: pets,
    append,
    remove,
  } = useFieldArray<StepThreeFormData>({
    control,
    name: 'other.pets',
  })

  useEffect(() => {
    reportValidity(isValid)
  }, [isValid])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        gap: '5px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label>Favourite animal</label>
      <Controller
        control={control}
        defaultValue={Animal.DOG}
        name="other.favouriteAnimal"
        render={({ field: { value, onChange } }) => (
          <AnimalSelector
            value={value}
            onChange={onChange}
            errorMsg={errors?.other?.favouriteAnimal?.message}
          />
        )}
      />
      <p style={{ fontSize: '10px', color: 'red' }}>{errors.other?.favouriteAnimal?.message}</p>
      <label>Handedness</label>
      <div style={{ display: 'flex', gap: '5px' }}>
        <input type="radio" {...register('other.handedness')} value={Handedness.LEFT} />
        <label>Left</label>
        <input type="radio" {...register('other.handedness')} value={Handedness.RIGHT} />
        <label>Right</label>
        <p style={{ fontSize: '10px', color: 'red' }}>{errors.other?.handedness?.message}</p>
      </div>
      <label>Pets</label>
      {pets.map((pet, index) => (
        <div key={pet.id} style={{ display: 'flex', gap: '10px' }}>
          <label>Pet name: </label>
          <input type="text" {...register(`other.pets.${index}.name`)} />
          <label>Pet type: </label>
          <Controller
            control={control}
            name={`other.pets.${index}.type`}
            defaultValue={Animal.CAT}
            render={({ field: { value, onChange } }) => (
              <AnimalSelector
                value={value}
                onChange={onChange}
                errorMsg={errors?.other?.pets?.[index]?.type?.toString()}
              />
            )}
          />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', type: Animal.DOG })}>
        Add a pet
      </button>
      <SubmitButton handleSubmit={handleSubmit} onSubmit={onSubmit} disabled={!isValid} />
    </form>
  )
}

/** Demo of controlled component */
const AnimalSelector = ({
  value,
  onChange,
  errorMsg,
}: {
  value: Animal
  onChange: (value: Animal) => void
  errorMsg?: string
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <select value={value} onChange={(e) => onChange(e.currentTarget.value as Animal)}>
        <option value={Animal.CAT}>Cat</option>
        <option value={Animal.DOG}>Dog</option>
        <option value={Animal.BIRD}>Bird</option>
        <option value={Animal.FISH}>Fish</option>
      </select>
      <p style={{ fontSize: '10px', color: 'red' }}>{errorMsg}</p>
    </div>
  )
}
