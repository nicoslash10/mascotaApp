import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ComentarioForm from "./ComentarioForm";
import ComentarioList from "./ComentarioList";

function MascotaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mascota, setMascota] = useState(null);
  const [estado, setEstado] = useState("");
  const [opciones, setOpciones] = useState(null);
  const [cargando, setCargando] = useState(true);

  async function cargarMascota() {
    try {
      const response = await api.get(`mascotas/${id}/`);

      setMascota(response.data);
      setEstado(response.data.estado);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      if (error.response?.status === 404) {
        alert("Mascota no encontrada");
      } else {
        alert("No se pudo cargar la mascota");
      }
    } finally {
      setCargando(false);
    }
  }

  async function cargarOpciones() {
    try {
      const response = await api.get("choices/");
      setOpciones(response.data);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      alert("No se pudieron cargar las opciones");
    }
  }

  async function actualizarEstado() {
    if (!estado) {
      alert("Debe seleccionar un estado");
      return;
    }

    try {
      const response = await api.patch(`mascotas/${id}/`, {
        estado: estado,
      });

      setMascota(response.data);
      alert("Estado actualizado correctamente");
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      if (error.response?.status === 400) {
        alert("El estado seleccionado no es válido");
      } else if (error.response?.status === 404) {
        alert("Mascota no encontrada");
      } else {
        alert("No se pudo actualizar el estado");
      }
    }
  }

  async function eliminarMascota() {
    const confirmar = confirm(
      "¿Está seguro de eliminar esta mascota?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await api.delete(`mascotas/${id}/`);

      if (response.status === 204) {
        alert("Mascota eliminada correctamente");
        navigate("/mascotas/listar");
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      if (error.response?.status === 404) {
        alert("Mascota no encontrada");
      } else {
        alert("No se pudo eliminar la mascota");
      }
    }
  }

  useEffect(() => {
    cargarMascota();
    cargarOpciones();
  }, [id]);

  if (cargando) {
    return <p>Cargando mascota...</p>;
  }

  if (!mascota) {
    return <p>No se encontró la mascota.</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Detalle de Mascota</h2>

      <div className="card mb-4">
        {mascota.imagen && (
          <img
            src={mascota.imagen}
            className="card-img-top"
            alt={mascota.nombre}
            style={{
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        )}

        <div className="card-body">
          <h3 className="card-title">{mascota.nombre}</h3>

          <p className="card-text">
            <strong>Descripción:</strong>{" "}
            {mascota.descripcion}
            <br />

            <strong>Tipo:</strong> {mascota.tipo_animal}
            <br />

            <strong>Raza:</strong>{" "}
            {mascota.raza || "No registrada"}
            <br />

            <strong>Edad:</strong>{" "}
            {mascota.edad ?? "No registrada"}
            <br />

            <strong>Sexo:</strong>{" "}
            {mascota.sexo || "No registrado"}
            <br />

            <strong>Tamaño:</strong>{" "}
            {mascota.tamano || "No registrado"}
            <br />

            <strong>Estado:</strong> {mascota.estado}
          </p>

          <div className="mb-3">
            <label className="form-label">
              Cambiar estado
            </label>

            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Seleccione</option>

              {opciones?.estado?.map((opcion) => (
                <option
                  key={opcion.value}
                  value={opcion.value}
                >
                  {opcion.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary me-2"
            onClick={actualizarEstado}
          >
            Actualizar estado
          </button>

          <button
            className="btn btn-danger"
            onClick={eliminarMascota}
          >
            Eliminar mascota
          </button>
        </div>
      </div>

      <ComentarioForm
        mascotaId={id}
        actualizarMascota={cargarMascota}
      />

      <ComentarioList
        comentarios={mascota.comentarios || []}
        actualizarMascota={cargarMascota}
      />
    </div>
  );
}

export default MascotaDetail;