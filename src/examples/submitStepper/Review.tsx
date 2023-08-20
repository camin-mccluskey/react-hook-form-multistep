import { DeepPartial } from "react-hook-form";
import { ExampleFormData } from "./SubmitStepperExample";

type ReviewProps = {
  data?: DeepPartial<ExampleFormData>;
  onSubmit: (formData: DeepPartial<ExampleFormData>) => void;
};

export default function Review({ data, onSubmit }: ReviewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <p>First Name: {data?.firstName}</p>
      <p>Last Name: {data?.lastName}</p>
      <p>Street: {data?.address?.street}</p>
      <p>Country: {data?.address?.countryCode}</p>
      <p>Favourite Animal: {data?.other?.favouriteAnimal}</p>
      <p>Left/Right Handed: {data?.other?.handedness}</p>
      <p>Pets:</p>
      {data?.other?.pets?.map((pet, idx) => (
        <div
          style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          key={idx}
        >
          <p>Name: {pet?.name}</p>
          <p>Type: {pet?.type}</p>
        </div>
      ))}
      {data ? <button onClick={() => onSubmit(data)}>Save</button> : null}
    </div>
  );
}
