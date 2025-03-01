import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fridge from './assets/The Fridge.png'
import login from './assets/login-background.png'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='size-full bg-cover bg-center bg-no-repeat'
    style={{backgroundImage: `url(${login})`}}>
      <h1>The fridge</h1>
    </div>
  )
}

export default App
