import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Userpage from './pages/Userpage'
import Camera from './pages/Userpage'
import AdminPage from './pages/Adminpage'
import Router from './router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router/>
    </>
  )
}

export default App

