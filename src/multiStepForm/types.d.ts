declare namespace ReactContextRefs {
  export interface Refs {
    submitButton: {
      current: MultiStepFormSubmitButtonRefProps;
      meta: { disabled: boolean; onSubmit: () => void; test: () => void };
    };
  }
}
