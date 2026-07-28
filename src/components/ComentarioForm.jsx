import { useState } from "react";
import api from "../services/api";

function ComentarioForm({ mascotaId, actualizarMascota }) {
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [errores, setErrores] = useState({});

  async function guardarComentario(e) {
    e.preventDefault();

    setErrores({});

    if (!autor.trim()) {
      setErrores({
        autor: "Debe ingresar el autor",
      });
      return;
    }

    if (!contenido.trim()) {
      setErrores({
        contenido: "Debe ingresar el comentario",
      });
      return;
    }

    try {
      const response = await api.post(
        `mascotas/${mascotaId}/comentar/`,
        {
          autor: autor,
          contenido: contenido,
        }
      );

      if (response.status === 201) {
        alert("Comentario agregado correctamente");

        setAutor("");
        setContenido("");
        setErrores({});

        actualizarMascota();
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      if (error.response?.status === 400) {
        setErrores({
          general: "Revise los datos del comentario",
        });
      } else if (error.response?.status === 404) {
        setErrores({
          general: "La mascota no fue encontrada",
        });
      } else {
        setErrores({
          general: "No se pudo agregar el comentario",
        });
      }
    }
  }

  return (
    <form onSubmit={guardarComentario} className="mb-4">
      <h4>Agregar comentario</h4>

      {errores.general && (
        <p className="text-danger">{errores.general}</p>
      )}

      <div className="mb-3">
        <label className="form-label">Autor</label>

        <input
          type="text"
          className="form-control"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        {errores.autor && (
          <p className="text-danger">{errores.autor}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Comentario</label>

        <textarea
          className="form-control"
          rows="3"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        {errores.contenido && (
          <p className="text-danger">{errores.contenido}</p>
        )}
      </div>

      <button type="submit" className="btn btn-success">
        Agregar comentario
      </button>
    </form>
  );
}

export default ComentarioForm;