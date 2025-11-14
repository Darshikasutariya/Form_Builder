import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="text-3xl font-bold underline mt-4 text-center bg-blue-500 rounded-lg p-2 w-fit mx-auto" >
      Hello World
    </div>
    </>
  )
}

export default App
