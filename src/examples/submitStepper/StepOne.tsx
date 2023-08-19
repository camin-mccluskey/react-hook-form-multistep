import { zodResolver } from "@hookform/resolvers/zod";
import { DeepPartial, UseFormHandleSubmit, useForm } from "react-hook-form";
import { z } from "zod";
import { BaseSyntheticEvent, useEffect } from "react";
import SubmitButton from "../../multiStepForm/SubmitButton";

const stepOneSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;

export type StepOneProps = {
  data?: DeepPartial<StepOneFormData>;
  onSubmit: (
    formData: StepOneFormData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event?: BaseSyntheticEvent<object, any, any>,
    nextStepIndex?: number
  ) => void;
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
      <SubmitButton onSubmit={customSubmit} disabled={!isValid} />
    </form>
  );
}
