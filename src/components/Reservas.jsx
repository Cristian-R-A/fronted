import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

export default function ReservaDemo() {
    const [reservas, setReservas] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [editingReserva, setEditingReserva] = useState(null);
    const [newReserva, setNewReserva] = useState({
        nombreCliente: '',
        fechaReserva: null,
        habitacionReservada: '',
        estadoReserva: ''
    });
    const toast = useRef(null);

    const habitaciones = ['Habitación Simple', 'Habitación Doble', 'Suite'];
    const estados = ['Pendiente', 'Confirmada', 'Cancelada'];

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            // En un entorno real, esto sería una llamada a una API
            const response = await axios.get('https://api-ejemplo.com/reservas');
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            // Usar datos de ejemplo en caso de error
            const reservasData = [
                { id: 1, nombreCliente: 'Juan Pérez', fechaReserva: '2024-09-20', habitacionReservada: 'Habitación Doble', estadoReserva: 'Pendiente' },
                { id: 2, nombreCliente: 'Ana López', fechaReserva: '2024-09-21', habitacionReservada: 'Suite', estadoReserva: 'Confirmada' },
                { id: 3, nombreCliente: 'Carlos García', fechaReserva: '2024-09-22', habitacionReservada: 'Habitación Simple', estadoReserva: 'Cancelada' },
            ];
            setReservas(reservasData);
        }
    };

    const createReserva = async () => {
        try {
            // En un entorno real, esto sería una llamada POST a una API
            const response = await axios.post('https://api-ejemplo.com/reservas', newReserva);
            setReservas([...reservas, response.data]);
            setDialogVisible(false);
            setNewReserva({ nombreCliente: '', fechaReserva: null, habitacionReservada: '', estadoReserva: '' });
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Reserva creada' });
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la reserva' });
        }
    };

    const updateReserva = async () => {
        try {
            // En un entorno real, esto sería una llamada PUT a una API
            const response = await axios.put(`https://api-ejemplo.com/reservas/${editingReserva.id}`, editingReserva);
            const updatedReservas = reservas.map(r => r.id === editingReserva.id ? response.data : r);
            setReservas(updatedReservas);
            setDialogVisible(false);
            setEditingReserva(null);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Reserva actualizada' });
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la reserva' });
        }
    };

    const deleteReserva = async (id) => {
        try {
            // En un entorno real, esto sería una llamada DELETE a una API
            await axios.delete(`https://api-ejemplo.com/reservas/${id}`);
            const updatedReservas = reservas.filter(r => r.id !== id);
            setReservas(updatedReservas);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Reserva eliminada' });
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la reserva' });
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Reservas', 14, 20);

        const tableColumn = ["ID", "Nombre Cliente", "Fecha Reserva", "Habitación Reservada", "Estado Reserva"];
        const tableRows = reservas.map(reserva => [
            reserva.id,
            reserva.nombreCliente,
            reserva.fechaReserva,
            reserva.habitacionReservada,
            reserva.estadoReserva
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save('reporte_reservas.pdf');
    };

    const getSeverity = (reserva) => {
        switch (reserva.estadoReserva) {
            case 'Confirmada':
                return 'success';
            case 'Cancelada':
                return 'danger';
            case 'Pendiente':
                return 'warning';
            default:
                return null;
        }
    };

    const itemTemplate = (reserva) => {
        return (
            <div className="col-12" key={reserva.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">Reserva para: {reserva.nombreCliente}</div>
                            <div>Fecha de reserva: {reserva.fechaReserva}</div>
                            <div>Habitación: {reserva.habitacionReservada}</div>
                            <div className="flex align-items-center gap-3">
                                <Tag value={reserva.estadoReserva} severity={getSeverity(reserva)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => {
                                setEditingReserva(reserva);
                                setDialogVisible(true);
                            }} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteReserva(reserva.id)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" />
                <Button label={editingReserva ? "Actualizar" : "Guardar"} icon="pi pi-check" onClick={editingReserva ? updateReserva : createReserva} autoFocus />
            </div>
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <Button label="Nueva Reserva" icon="pi pi-plus" className="p-button-success mb-4" onClick={() => {
                setEditingReserva(null);
                setDialogVisible(true);
            }} />
            <Button label="Descargar Reporte PDF" icon="pi pi-file-pdf" className="p-button-danger mb-4 ml-2" onClick={exportPDF} />
            <DataView value={reservas} itemTemplate={itemTemplate} />

            <Dialog 
                visible={dialogVisible} 
                style={{ width: '450px' }} 
                header={editingReserva ? "Editar Reserva" : "Nueva Reserva"} 
                modal 
                className="p-fluid" 
                footer={renderFooter} 
                onHide={() => setDialogVisible(false)}
            >
                <div className="field">
                    <label htmlFor="nombreCliente">Nombre del Cliente</label>
                    <InputText id="nombreCliente" value={editingReserva ? editingReserva.nombreCliente : newReserva.nombreCliente} 
                               onChange={(e) => editingReserva ? setEditingReserva({...editingReserva, nombreCliente: e.target.value}) : setNewReserva({...newReserva, nombreCliente: e.target.value})} />
                </div>
                <div className="field">
                    <label htmlFor="fechaReserva">Fecha de Reserva</label>
                    <Calendar id="fechaReserva" value={editingReserva ? new Date(editingReserva.fechaReserva) : newReserva.fechaReserva} 
                              onChange={(e) => {
                                  const fecha = e.value ? e.value.toISOString().split('T')[0] : null;
                                  editingReserva ? setEditingReserva({...editingReserva, fechaReserva: fecha}) : setNewReserva({...newReserva, fechaReserva: fecha});
                              }} />
                </div>
                <div className="field">
                    <label htmlFor="habitacionReservada">Habitación Reservada</label>
                    <Dropdown id="habitacionReservada" options={habitaciones} value={editingReserva ? editingReserva.habitacionReservada : newReserva.habitacionReservada} 
                              onChange={(e) => editingReserva ? setEditingReserva({...editingReserva, habitacionReservada: e.value}) : setNewReserva({...newReserva, habitacionReservada: e.value})} />
                </div>
                <div className="field">
                    <label htmlFor="estadoReserva">Estado de Reserva</label>
                    <Dropdown id="estadoReserva" options={estados} value={editingReserva ? editingReserva.estadoReserva : newReserva.estadoReserva} 
                              onChange={(e) => editingReserva ? setEditingReserva({...editingReserva, estadoReserva: e.value}) : setNewReserva({...newReserva, estadoReserva: e.value})} />
                </div>
            </Dialog>
        </div>
    );
}