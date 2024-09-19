import React from 'react'

const Dashboard = () => {
  return (
    <div className='p-6'>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-white p-4 rounded shadow-md'>
            <h3 className='text-xl font-bold mb-2'>Habitaciones</h3>
            <p className='text-gray-700'>80 Habitaciones</p>
        </div>
        <div className='bg-white p-4 rounded shadow-md'>
            <h3 className='text-xl font-bold mb-2'>Reservas</h3>
            <p className='text-gray-700'>1 Reserva</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard