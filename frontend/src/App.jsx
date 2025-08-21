import React, { useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element= {<Navigate to = "/login"/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App
