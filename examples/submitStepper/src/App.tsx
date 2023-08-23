import './App.css'
import SubmitStepperExampleForm from '~/form/SubmitStepperExampleForm'

function App() {
  return (
    <div
      className="App"
      style={{
        height: 'fit-content',
        width: '100%',
        display: 'grid',
        grid: '50% / auto auto auto',
        gridGap: '10rem',
      }}
    >
      <SubmitStepperExampleForm />
    </div>
  )
}

export default App
