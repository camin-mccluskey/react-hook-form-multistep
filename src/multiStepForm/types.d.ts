type MultiStepFormSubmitButtonRefProps = {
  disabled: boolean;
  stepperSubmit: () => void;
};

declare namespace ReactContextRefs {
  export interface Refs {
    submitButton: {
      current: HTMLBUttonElement & MultiStepFormSubmitButtonRefProps;
      meta: MultiStepFormSubmitButtonRefProps;
    };
  }
}
