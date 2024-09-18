import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import "/node_modules/primeflex/primeflex.css"
import "primeflex/themes/primeone-light.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main>
        <button>
          Accéder mes courses
        </button>
      </main>
    </>
  )
}

export default App
