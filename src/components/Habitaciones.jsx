import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";

export default function HabitacionesDataView() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const habitacionesEjemplo = [
      {
        id: 1,
        numero_habitacion: 101,
        precio: 100.0,
        id_tipo_habitacion: "simple",
        rating: 4,
        disponibilidad: "DISPONIBLE",
        imagen: "/images/habitaciones/ddggs.jpg",
      },
      {
        id: 2,
        numero_habitacion: 102,
        precio: 150.0,
        id_tipo_habitacion: "doble",
        rating: 5,
        disponibilidad: "OCUPADA",
        imagen: "/images/habitaciones/habitacion_Doble_1.jpg",
      },
      {
        id: 3,
        numero_habitacion: 103,
        precio: 200.0,
        id_tipo_habitacion: "suite",
        rating: 5,
        disponibilidad: "DISPONIBLE",
        imagen: "/images/habitaciones/atico-suite-1024x640.jpg",
      },
      {
        id: 4,
        numero_habitacion: 104,
        precio: 100.0,
        id_tipo_habitacion: "simple",
        rating: 3,
        disponibilidad: "DISPONIBLE",
        imagen: "/images/habitaciones/simple.jpg",
      },
      {
        id: 5,
        numero_habitacion: 105,
        precio: 150.0,
        id_tipo_habitacion: "doble",
        rating: 4,
        disponibilidad: "DISPONIBLE",
        imagen: "/images/habitaciones/doblee.jpg",
      },
      {
        id: 6,
        numero_habitacion: 106,
        precio: 250.0,
        id_tipo_habitacion: "suite",
        rating: 5,
        disponibilidad: "OCUPADA",
        imagen: "/images/habitaciones/delujo.jpg",
      },
    ];
    setHabitaciones(habitacionesEjemplo);
  }, []);

  const getSeverity = (habitacion) => {
    switch (habitacion.disponibilidad) {
      case "DISPONIBLE":
        return "success";
      case "OCUPADA":
        return "danger";
      default:
        return null;
    }
  };

  const openCalendar = (habitacion) => {
    setSelectedHabitacion(habitacion);
    setShowCalendar(true);
  };

  const reservarHabitacion = () => {
    if (selectedDate && selectedHabitacion) {
      setHabitaciones(
        habitaciones.map((h) =>
          h.id === selectedHabitacion.id ? { ...h, disponibilidad: "OCUPADA" } : h
        )
      );
      toast.current.show({
        severity: "success",
        summary: "Reserva Exitosa",
        detail: `Has reservado la habitación ${selectedHabitacion.numero_habitacion} para el ${selectedDate.toLocaleDateString()}`,
        life: 3000,
      });
      setShowCalendar(false);
      setSelectedDate(null);
      setSelectedHabitacion(null);
    }
  };

  const listItem = (habitacion) => {
    return (
      <div className="col-12" key={habitacion.id}>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={habitacion.imagen || "/images/habitaciones/default.jpg"}
            alt={`Habitación ${habitacion.numero_habitacion}`}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                Habitación {habitacion.numero_habitacion}
              </div>
              <Rating value={habitacion.rating} readOnly cancel={false} />
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{habitacion.id_tipo_habitacion}</span>
                </span>
                <Tag value={habitacion.disponibilidad} severity={getSeverity(habitacion)} />
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${habitacion.precio}</span>
              <Button
                label="Reservar"
                icon="pi pi-check"
                onClick={() => openCalendar(habitacion)}
                disabled={habitacion.disponibilidad === "OCUPADA"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (habitacion) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={habitacion.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{habitacion.id_tipo_habitacion}</span>
            </div>
            <Tag value={habitacion.disponibilidad} severity={getSeverity(habitacion)} />
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={habitacion.imagen || "/images/habitaciones/default.jpg"}
              alt={`Habitación ${habitacion.numero_habitacion}`}
            />
            <div className="text-2xl font-bold">
              Habitación {habitacion.numero_habitacion}
            </div>
            <Rating value={habitacion.rating} readOnly cancel={false} />
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${habitacion.precio}</span>
            <Button
              label="Reservar"
              icon="pi pi-check"
              onClick={() => openCalendar(habitacion)}
              disabled={habitacion.disponibilidad === "OCUPADA"}
            />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (habitacion, layout) => {
    if (!habitacion) {
      return;
    }

    if (layout === "list") return listItem(habitacion);
    else if (layout === "grid") return gridItem(habitacion);
  };

  const renderCategory = (category, habitacionesFiltradas) => {
    return (
      <div key={category}>
        <h2 className="text-2xl font-bold mb-4 mt-6">
          {category.charAt(0).toUpperCase() + category.slice(1)}s
        </h2>
        <DataView
          value={habitacionesFiltradas}
          layout={layout}
          itemTemplate={itemTemplate}
          paginator
          rows={3}
        />
      </div>
    );
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  const categorias = ["simple", "doble", "suite"];

  return (
    <div className="card">
      <Toast ref={toast} />
      {header()}
      {categorias.map((categoria) => {
        const habitacionesFiltradas = habitaciones.filter(
          (h) => h.id_tipo_habitacion === categoria
        );
        return renderCategory(categoria, habitacionesFiltradas);
      })}
      <Dialog
        visible={showCalendar}
        onHide={() => setShowCalendar(false)}
        header="Seleccionar fecha de reserva"
        footer={
          <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowCalendar(false)} className="p-button-text" />
            <Button label="Confirmar Reserva" icon="pi pi-check" onClick={reservarHabitacion} autoFocus />
          </div>
        }
      >
        <Calendar
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.value)}
          inline
          showWeek
        />
      </Dialog>
    </div>
  );
}