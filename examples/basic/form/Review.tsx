import React from 'react'
import type { ExampleFormData } from './BasicExampleForm'

type ReviewProps = {
  data?: Partial<ExampleFormData>
  onSubmit: (formData: Partial<ExampleFormData>) => void
}

export default function Review({ data, onSubmit }: ReviewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <p>{data?.firstName}</p>
      <p>{data?.lastName}</p>
      <p>{data?.address?.street}</p>
      <p>{data?.address?.countryCode}</p>
      {data ? <button onClick={() => onSubmit(data)}>Save</button> : null}
    </div>
  )
}
