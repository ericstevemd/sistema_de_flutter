import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://http://localhost:3000/estudiantes/"; // Cambia esto según tu configuración

const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [newEstudiante, setNewEstudiante] = useState({
    nombre: "",
    cedula: "",
    genero: "",
    nacionalidad: "",
    fechaNacimiento: "",
    curso: "",
    edad: "",
    problemasDiscapacidad: false,
    problemasSalud: "",
    tipoSangre: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar estudiantes al inicio
  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setEstudiantes(response.data);
    } catch (err) {
      setError("Error al cargar los estudiantes");
    } finally {
      setLoading(false);
    }
  };

  const addEstudiante = async () => {
    if (!newEstudiante.nombre || !newEstudiante.cedula || !newEstudiante.edad) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(API_URL, newEstudiante);
      setSuccessMessage("Estudiante agregado exitosamente!");
      setNewEstudiante({
        nombre: "",
        cedula: "",
        genero: "",
        nacionalidad: "",
        fechaNacimiento: "",
        curso: "",
        edad: "",
        problemasDiscapacidad: false,
        problemasSalud: "",
        tipoSangre: "",
      });
      fetchEstudiantes(); // Actualizar la lista
    } catch (err) {
      setError("Error al agregar el estudiante");
    } finally {
      setLoading(false);
    }
  };

  const deleteEstudiante = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      fetchEstudiantes(); // Actualizar la lista
    } catch (err) {
      setError("Error al eliminar el estudiante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Estudiantes</h1>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Formulario para agregar estudiante */}
      <div>
        <h2>Agregar Estudiante</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newEstudiante.nombre}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cédula"
          value={newEstudiante.cedula}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, cedula: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Género"
          value={newEstudiante.genero}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, genero: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Nacionalidad"
          value={newEstudiante.nacionalidad}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, nacionalidad: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={newEstudiante.fechaNacimiento}
          onChange={(e) =>
            setNewEstudiante({
              ...newEstudiante,
              fechaNacimiento: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Curso"
          value={newEstudiante.curso}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, curso: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Edad"
          value={newEstudiante.edad}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, edad: e.target.value })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={newEstudiante.problemasDiscapacidad}
            onChange={(e) =>
              setNewEstudiante({
                ...newEstudiante,
                problemasDiscapacidad: e.target.checked,
              })
            }
          />
          ¿Problemas de discapacidad?
        </label>
        <input
          type="text"
          placeholder="Problemas de Salud"
          value={newEstudiante.problemasSalud}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, problemasSalud: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Tipo de Sangre"
          value={newEstudiante.tipoSangre}
          onChange={(e) =>
            setNewEstudiante({ ...newEstudiante, tipoSangre: e.target.value })
          }
        />
        <button onClick={addEstudiante}>Agregar</button>
      </div>

      {/* Lista de estudiantes */}
      <h2>Lista de Estudiantes</h2>
      {estudiantes.length > 0 ? (
        <ul>
          {estudiantes.map((estudiante) => (
            <li key={estudiante.id}>
              {estudiante.nombre} (Edad: {estudiante.edad}, Cédula: {estudiante.cedula}){" "}
              <button onClick={() => deleteEstudiante(estudiante.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay estudiantes registrados</p>
      )}
    </div>
  );
};

export default EstudiantesPage;
