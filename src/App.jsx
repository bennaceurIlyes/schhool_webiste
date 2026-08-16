import React from 'react'
import Home from './cmponent/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import About from './cmponent/About'
import Contact from './cmponent/Contact'
import Classes from './cmponent/Classes'
import Dashboard from './cmponent/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App