const useMultiStepSubmit = ({ handleSubmit, onSubmit, }) => {
    return (nextStepIndex) => {
        return handleSubmit((data, e) => onSubmit(data, e, nextStepIndex), (errors) => {
            console.log('errors', errors);
        })();
    };
};
export default useMultiStepSubmit;
//# sourceMappingURL=useMultiStepSubmit.js.map