import { zodResolver } from "@hookform/resolvers/zod";
import { DeepPartial, useForm } from "react-hook-form";
import { z } from "zod";
import { BaseSyntheticEvent, useEffect } from "react";
import SubmitButton from "../../multiStepForm/SubmitButton";

const stepTwoSchema = z.object({
  address: z.object({
    street: z.string().min(1),
    countryCode: z.string().min(2).max(2).optional().or(z.literal("")),
  }),
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

type StepTwoProps = {
  data?: DeepPartial<StepTwoFormData>;
  onSubmit: (
    formData: StepTwoFormData,
    event?: BaseSyntheticEvent,
    nextStepIndex?: number
  ) => void;
  reportValidity: (isValid: boolean) => void;
};

export default function StepTwo({
  data,
  onSubmit,
  reportValidity,
}: StepTwoProps) {
  const methods = useForm<StepTwoFormData>({
    defaultValues: data,
    mode: "all",
    resolver: zodResolver(stepTwoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    reportValidity(isValid);
  }, [isValid]);

  // TODO: move this to a hook probbably
  const customSubmit = (nextStepIndex?: number) => {
    return handleSubmit(
      (data, e) => onSubmit(data, e, nextStepIndex),
      (errors) => {
        console.log("errors", errors);
      }
    )();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        gap: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label>Address Line 1</label>
      <input type="text" {...register("address.street")} />
      <p style={{ fontSize: "10px", color: "red" }}>
        {errors.address?.street?.message}
      </p>
      <label>Country Code</label>
      <input type="text" {...register("address.countryCode")} />
      <p style={{ fontSize: "10px", color: "red" }}>
        {errors.address?.countryCode?.message}
      </p>
      <SubmitButton onSubmit={customSubmit} disabled={!isValid} />
    </form>
  );
}
