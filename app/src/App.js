import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

//Import components
import Home from './Pages/Home/Home';

// Style file
import './App.css';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
  );
}

export {App};