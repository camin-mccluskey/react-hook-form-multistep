"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useMultiStepSubmit = ({ handleSubmit, onSubmit, }) => {
    return (nextStepIndex) => {
        return handleSubmit((data, e) => onSubmit(data, e, nextStepIndex), (errors) => {
            console.log('errors', errors);
        })();
    };
};
exports.default = useMultiStepSubmit;
//# sourceMappingURL=useMultiStepSubmit.js.map