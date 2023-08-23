import '~/App.css'
import BasicExampleForm from '~/form/BasicExampleForm'

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
      <BasicExampleForm />
    </div>
  )
}

export default App
