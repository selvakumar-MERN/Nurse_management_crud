import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
    <ToastContainer />
           <BrowserRouter>
      {/* authentication */}
      <Routes>
      <Route exact path='/' element={<Home />} />
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
