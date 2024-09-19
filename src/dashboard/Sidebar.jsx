import React, { useState } from 'react'
import { FaBars, FaHome, FaEtsy, FaBraille, FaCheckDouble, FaCog } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { BsCalendar3 } from "react-icons/bs";
import { MdBed } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen ] = useState(false);
  return (
    <div>
      {/* button para tamaños pequeñas->moviles */}
       <button 
            className='md:hidden p-4 text-white bg-gray-800'
            onClick={() => setIsOpen(!isOpen)}          
       >
        <FaBars />
        </button> 
        <div className={`h-full md:w-64 bg-gray-800 text-white p-4 fixed 
            md:relative transition-transform transform ${isOpen ?  
            "translate-x-0" : "-translate-x-full"} md:translate-x-0` }>
                <h1 className='text-2xl font-bold mb-6'>Reservaciones</h1>
            <ul>
            <li className='mb-4 flex items-center'>
                    <FaBuilding  className='mr-3' />
                    <Link to="/tipohabitaciones" className="hover:text-gray-200">Tipo de Habitaciones</Link>
            </li>
            <li className='mb-4 flex items-center'>
                    <MdBed  className='mr-3' />
                    <Link to="/habitaciones" className="hover:text-gray-200">Habitaciones</Link>
            </li>
            <li className='mb-4 flex items-center'>
                    <BsCalendar3  className='mr-3' />
                    <Link to="/reservas" className="hover:text-gray-200">Reservas</Link>
            </li>
            <li className='mb-4 flex items-center'>
                    <BsCalendar3  className='mr-3' />
                    <Link to="/usuarios" className="hover:text-gray-200">Usuarios</Link>
            </li>
            </ul>    
        </div>
    </div>
  )
}

export default Sidebar