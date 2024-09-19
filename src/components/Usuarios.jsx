import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await axios.get('/api/usuarios');
    setUsuarios(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/usuarios/${id}`);
    fetchUsuarios();
  };

  const handleEdit = async (user) => {
    if (editingUser) {
      await axios.put(`/api/usuarios/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsuarios();
    } else {
      setEditingUser(user);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.telefono}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div>
          <h3>Editar Usuario</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
            <input
              type="text"
              name="nombre"
              value={editingUser.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellido"
              value={editingUser.apellido}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <input
              type="email"
              name="email"
              value={editingUser.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="telefono"
              value={editingUser.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
