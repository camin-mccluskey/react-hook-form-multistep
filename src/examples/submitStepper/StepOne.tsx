import { zodResolver } from "@hookform/resolvers/zod";
import { DeepPartial, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import SubmitButton from "../../multiStepForm/SubmitButton";
import { FormStepOnSubmit } from "../../multiStepForm/types";

export const stepOneSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;

export type StepOneProps = {
  data?: DeepPartial<StepOneFormData>;
  onSubmit: FormStepOnSubmit;
  reportValidity: (isValid: boolean) => void;
  title: string;
};

export default function StepOne({
  data,
  onSubmit,
  reportValidity,
  title,
}: StepOneProps) {
  const methods = useForm<StepOneFormData>({
    defaultValues: data,
    mode: "all",
    resolver: zodResolver(stepOneSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    reportValidity(isValid);
  }, [isValid]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        gap: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{}}>{title}</h3>
      <label>First Name</label>
      <input type="text" {...register("firstName")} />
      <p style={{ fontSize: "10px", color: "red" }}>
        {errors.firstName?.message}
      </p>
      <label>Last Name</label>
      <input type="text" {...register("lastName")} />
      <p style={{ fontSize: "10px", color: "red" }}>
        {errors.lastName?.message}
      </p>
      <SubmitButton
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        disabled={!isValid}
      />
    </form>
  );
}
