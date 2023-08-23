import "./App.css";
import BasicExample from "./examples/basic/BasicExample";
import SubmitStepperExample from "./examples/submitStepper/SubmitStepperExample";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "fit-content",
        width: "100%",
        display: "grid",
        grid: "50% / auto auto auto",
        gridGap: "10rem",
      }}
    >
      <BasicExample />
      <SubmitStepperExample />
    </div>
  );
}

export default App;
