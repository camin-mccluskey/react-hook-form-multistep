import { DeepPartial } from "react-hook-form";
import { ExampleFormData } from "./SubmitStepperExample";

type ReviewProps = {
  data?: DeepPartial<ExampleFormData>;
  onSubmit: (formData: DeepPartial<ExampleFormData>) => void;
};

export default function Review({ data, onSubmit }: ReviewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <p>{data?.firstName}</p>
      <p>{data?.lastName}</p>
      <p>{data?.address?.street}</p>
      <p>{data?.address?.countryCode}</p>
      <p>{data?.other?.favouriteAnimal}</p>
      <p>{data?.other?.handedness}</p>
      <p>Pets</p>
      {data?.other?.pets?.map((pet, idx) => (
        <div style={{ display: "flex", flexDirection: "row" }} key={idx}>
          <p>{pet?.name}</p>
          <p>{pet?.type}</p>
        </div>
      ))}
      {data ? <button onClick={() => onSubmit(data)}>Save</button> : null}
    </div>
  );
}
