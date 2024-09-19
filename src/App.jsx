import './App.css'

import Navbar from './dashboard/Navbar'
import Sidebar from './dashboard/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Footer from './dashboard/Footer'
import Habitaciones from './components/Habitaciones'
import Reservas from './components/Reservas'
import TipoHabitaciones from './components/TipoHabitaciones'
import Usuarios from './components/Usuarios' 
import React from 'react'


function App() {
  return (
    <Router>
      <div className='flex flex-col md:flex-row h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
              <Navbar />
              <div className='flex-grow overflow-y-auto p-4 bg-gray-100'>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tipohabitaciones" element={<TipoHabitaciones />} />
                    <Route path="/habitaciones" element={<Habitaciones />} />
                    <Route path="/habitaciones/:tipo" element={<Habitaciones />} />
                    <Route path="/reservas" element={<Reservas />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                  </Routes>
              </div>
              <Footer />
          </div>  
      </div>
    </Router>
  );
}

export default App
