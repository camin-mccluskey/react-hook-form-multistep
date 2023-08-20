import { useState } from "react";
import MultiStepForm from "../../multiStepForm";
import StepOne, { StepOneFormData } from "./StepOne";
import StepTwo, { StepTwoFormData } from "./StepTwo";
import Review from "./Review";
import { DeepPartial } from "react-hook-form";
import StepThree, { Animal, Handedness, StepThreeFormData } from "./StepThree";
import CustomStepper from "./CustomerStepper";

/** This is a contrived example to demonstrate how to use the MultiStepForm component */
/** Set up some types for the data we will manipulate in the form */

export type ExampleFormData = StepOneFormData &
  StepTwoFormData &
  StepThreeFormData;

/** Set up some example data to populate the form initially. This is not necessary but it does demonstrate how the form can be used to both create and edit data */
const exampleData: ExampleFormData = {
  firstName: "Camin",
  lastName: "McCluskey",
  address: {
    street: "14 Random Road",
    countryCode: "GB",
  },
  other: {
    favouriteAnimal: Animal.CAT,
    handedness: Handedness.LEFT,
    pets: [
      {
        name: "Fluffy",
        type: Animal.CAT,
      },
    ],
  },
};

export default function SubmitStepperExample() {
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

  const onSubmitStepThree = (data: StepThreeFormData) => {
    setStore((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // arguably this should function exactly the same as the other steps
  // i.e. the review step should do a final validation on submit
  const onFinalSubmit = (data: DeepPartial<ExampleFormData>) => {
    console.log("persisting to db: ", data);
  };

  return (
    <MultiStepForm>
      <MultiStepForm.Stepper
        render={(stepperProps) => CustomStepper(stepperProps)}
      />
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
        renderStepForm={({ reportStepValidity, handleStepSubmit }) => (
          <StepThree
            data={store}
            onSubmit={handleStepSubmit(onSubmitStepThree)}
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
