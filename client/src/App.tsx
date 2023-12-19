import { useState } from 'react'
import VocabSearch from './components/shared/VocabSearch'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='inline-flex items-baseline'>
          <img src={viteLogo} className="logo mx-2" alt="Vite logo" />
          <h1 className='py-2'>learn</h1>
      </div>
      <VocabSearch />
    </>
  )
}

export default App
