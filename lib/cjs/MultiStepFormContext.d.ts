/// <reference types="react" />
import type { MultiStepFormStepperContextFields, MultiStepFormStepsContextFields } from './types';
export declare const MultiStepFormStepsContext: import("react").Context<MultiStepFormStepsContextFields>;
export declare const MultiStepFormStepperContext: import("react").Context<MultiStepFormStepperContextFields>;
export declare function useMultiStepFormContext(): {
    stepsContext: MultiStepFormStepsContextFields;
    stepperContext: MultiStepFormStepperContextFields;
};
