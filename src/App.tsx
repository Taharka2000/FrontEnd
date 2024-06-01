import React from 'react';
import RegistrationForm from './Pages/Contacte';
import { Link, redirect, Routes, Route, useNavigate } from "react-router-dom";
import Contact from './Services/contacSerice';
import Ajout from './Pages/Ajout';
import Contacte from './Pages/Contacte';

const App: React.FC = () => {
  return (
    <div className="flex bg- items-center justify-center min-h-screen bg-gray-100">
     <Routes>
      <Route path='/' element={<Contacte/>}/>
      <Route path='/ajout' element={<Ajout/>}/>
     </Routes>
    </div>
  );
};

export default App;
