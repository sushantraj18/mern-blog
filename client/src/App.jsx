import React from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Project from './pages/Project'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/about" Component={About}/>
      <Route path="/dashboard" Component={Dashboard}/>
      <Route path="/login" Component={Login}/>
      <Route path="/signup" Component={Signup}/>
      <Route path="/project" Component={Project}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App