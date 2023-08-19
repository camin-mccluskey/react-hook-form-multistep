type MultiStepFormSubmitButtonRefProps = {
  disabled: boolean;
  stepperSubmit: (nextStepIndex: number) => void;
};

declare namespace ReactContextRefs {
  export interface Refs {
    submitButton: {
      current: HTMLBUttonElement & MultiStepFormSubmitButtonRefProps;
      meta: MultiStepFormSubmitButtonRefProps;
    };
  }
}
