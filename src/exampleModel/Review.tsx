import { DeepPartial } from "react-hook-form";
import { ExampleFormData } from "./Example";

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
      {data ? <button onClick={() => onSubmit(data)}>Save</button> : null}
    </div>
  );
}
