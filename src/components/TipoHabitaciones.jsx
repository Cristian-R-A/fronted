import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function TiposHabitacionDemo() {
    const [habitaciones, setHabitaciones] = useState([]);
    const navigate = useNavigate(); // Hook para redireccionar

    useEffect(() => {
        const tiposHabitacion = [
            { id: 1, nombre: 'Simple', descripcion: 'Habitación con cama individual', capacidad: 1, imagen: '/images/habitaciones/simplelogo.jpg' },
            { id: 2, nombre: 'Doble', descripcion: 'Habitación con cama doble', capacidad: 4, imagen: '/images/habitaciones/doblelogo.jpg' },
            { id: 3, nombre: 'Suite', descripcion: 'Suite de lujo con vista al mar', capacidad: 2, imagen: '/images/habitaciones/suitelogo.jpg' },
        ];
        setHabitaciones(tiposHabitacion);
    }, []);

    const getSeverity = (habitacion) => {
        if (habitacion.capacidad >= 4) return 'success';
        else if (habitacion.capacidad === 2) return 'warning';
        else return 'info';
    };

    const handleVerClick = (tipo) => {
        // Redirigir a la vista de habitaciones filtradas por tipo
        navigate(`/habitaciones/${tipo}`);
    };

    const itemTemplate = (habitacion, index) => {
        return (
            <div className="col-12" key={habitacion.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <img className="w-6 shadow-2 border-round" src={habitacion.imagen} alt={`Habitación ${habitacion.numero_habitacion}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{habitacion.nombre}</div>
                            <p>{habitacion.descripcion}</p>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-users"></i>
                                    <span className="font-semibold">Capacidad: {habitacion.capacidad}</span>
                                </span>
                                <Tag value={`Capacidad: ${habitacion.capacidad}`} severity={getSeverity(habitacion)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {/* Cambiar el botón a "Ver" */}
                            <Button 
                                label="Ver" 
                                icon="pi pi-eye" 
                                className="p-button-rounded" 
                                onClick={() => handleVerClick(habitacion.nombre.toLowerCase())} // Redirigir con el tipo de habitación
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={habitaciones} itemTemplate={itemTemplate} />
        </div>
    );
}
