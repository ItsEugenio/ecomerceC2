import React from 'react';


import HomePage from './pages/HomePage';
import AdminHome from './pages/AdminHome';
import {
  BrowserRouter,
  Routes,
  Route,
  
  
}
from "react-router-dom";

function App() {

  return (

     <BrowserRouter>
     <Routes>
     
     <Route path="/" element={<HomePage/>}  />
      <Route path="/Admin" element={<AdminHome/>}  />
     </Routes>
     </BrowserRouter>
  );
}

export default App;
