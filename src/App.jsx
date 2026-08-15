import React from 'react'
import Home from './cmponent/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import About from './cmponent/About'
import Contact from './cmponent/Contact'
import Classes from './cmponent/Classes'
function App() {
  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/About" element={<About></About>}></Route>
    <Route path="/Contact" element={<Contact></Contact>} />
    <Route path="/Classes" element={<Classes></Classes>} />
</Routes>
    </BrowserRouter>
    </>
  )
}

export default App