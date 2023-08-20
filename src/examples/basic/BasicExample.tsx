import { useState } from "react";
import MultiStepForm from "../../multiStepForm/MultiStepForm";
import StepOne, { StepOneFormData } from "./StepOne";
import StepTwo, { StepTwoFormData } from "./StepTwo";
import Review from "./Review";
import { DeepPartial } from "react-hook-form";

export type ExampleFormData = {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    countryCode?: string;
  };
};

const exampleData: ExampleFormData = {
  firstName: "Camin",
  lastName: "McCluskey",
  address: {
    street: "14 Random Road",
    countryCode: "GB",
  },
};

export default function BasicExample() {
  // store is the scratchpad for the child forms to play around with
  const [store, setStore] = useState<DeepPartial<ExampleFormData>>(exampleData); // this data will actually be a prop or network call

  const onSubmitStepOne = (data: StepOneFormData) => {
    setStore((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const onSubmitStepTwo = (data: StepTwoFormData) => {
    setStore((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const onFinalSubmit = (data: DeepPartial<ExampleFormData>) => {
    console.log("persisting to db: ", data);
  };

  return (
    <MultiStepForm>
      <MultiStepForm.Step
        renderStepForm={({ reportStepValidity, handleStepSubmit }) => (
          <StepOne
            data={store}
            onSubmit={handleStepSubmit(onSubmitStepOne)}
            reportValidity={reportStepValidity}
            title="My new form"
          />
        )}
      />
      <MultiStepForm.Step
        renderStepForm={({ reportStepValidity, handleStepSubmit }) => (
          <StepTwo
            data={store}
            onSubmit={handleStepSubmit(onSubmitStepTwo)}
            reportValidity={reportStepValidity}
          />
        )}
      />
      <MultiStepForm.Step
        renderStepForm={({ handleStepSubmit }) => (
          <Review data={store} onSubmit={handleStepSubmit(onFinalSubmit)} />
        )}
      />
    </MultiStepForm>
  );
}
