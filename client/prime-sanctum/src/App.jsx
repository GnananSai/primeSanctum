// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Navbar from "./components/navbar/Navbar.jsx"
import "./layout.scss"
import HomePage from "./routes/homePage/homePage.jsx"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="layout">
      <div className="navbar">
      <Navbar/>
      </div>

      <div className="content">
        
        <HomePage/>
      </div>
     
    </div>
  )
}

export default App
