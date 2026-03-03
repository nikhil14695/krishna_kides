import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {hom} from './page/Home.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <home />
    </>
  )
}

export default App
