import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [dropdowndrop, setDropdownOpen] = useState(false);
  return (
    <div className='bg-gray-900 text-white p-4 flex items-center 
    justify-between'>
        <span className='text-lg'>Bienvenido. Admin</span>
        <div className='relative'>
            <button 
              className='flex items-center focus:outline-none' 
              onClick={() => setDropdownOpen(!dropdowndrop)}>
                <FaUserCircle className='text-2xl mr-2' />
                <span className='text-sm'>Admin</span>
            </button>
            {dropdowndrop && (
              <div className='absolute right-0 mt-2 w-48 bg-white
               text-black rounded shadow-lg'>
                <a href="#" className='block px-4 py-2 text-sm 
                hover:bg-gray-200'>Perfil</a>
                <a href="#" className='block px-4 py-2 text-sm 
                hover:bg-gray-200'>Cerrar Sesión</a>
              </div>
            )}
        </div>
    </div>
  )
}
export default Navbar