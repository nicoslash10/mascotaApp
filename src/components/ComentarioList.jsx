import api from "../services/api";

function ComentarioList({ comentarios, actualizarMascota }) {
  async function eliminarComentario(id) {
    const confirmar = confirm(
      "¿Está seguro de eliminar este comentario?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await api.delete(`comentarios/${id}/`);

      if (response.status === 204) {
        alert("Comentario eliminado correctamente");
        actualizarMascota();
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      if (error.response?.status === 404) {
        alert("El comentario no fue encontrado");
      } else {
        alert("No se pudo eliminar el comentario");
      }
    }
  }

  return (
    <div>
      <h4>Comentarios</h4>

      {comentarios.length === 0 ? (
        <p>No hay comentarios registrados.</p>
      ) : (
        comentarios.map((comentario) => (
          <div className="card mb-3" key={comentario.id}>
            <div className="card-body">
              <h6 className="card-title">
                {comentario.autor}
              </h6>

              <p className="card-text">
                {comentario.contenido}
              </p>

              <small className="text-muted">
                {new Date(
                  comentario.fecha_creacion
                ).toLocaleString()}
              </small>

              <br />

              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() =>
                  eliminarComentario(comentario.id)
                }
              >
                Eliminar comentario
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ComentarioList;