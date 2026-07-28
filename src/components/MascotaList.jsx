import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MascotaList() {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  async function cargarMascotas() {
    try {
      const response = await api.get("mascotas/");
      setMascotas(response.data);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      alert("No se pudieron cargar las mascotas");
    } finally {
      setCargando(false);
    }
  }



  useEffect(() => {
    cargarMascotas();
  }, []);



  if (cargando) {
    return <p>Cargando mascotas...</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Listado de Mascotas</h2>

      {mascotas.length === 0 ? (
        <p>No hay mascotas registradas.</p>
      ) : (
        <div className="row">
          {mascotas.map((mascota) => (
            <div className="col-md-4 mb-4" key={mascota.id}>
              <div className="card h-100">
                {mascota.imagen && (
                  <img
                    src={mascota.imagen}
                    className="card-img-top"
                    alt={mascota.nombre}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{mascota.nombre}</h5>

                  <p className="card-text">
                    <strong>Tipo:</strong> {mascota.tipo_animal}
                    <br />

                    <strong>Raza:</strong>{" "}
                    {mascota.raza || "No registrada"}
                    <br />

                    <strong>Edad:</strong>{" "}
                    {mascota.edad ?? "No registrada"}
                    <br />

                    <strong>Estado:</strong> {mascota.estado}
                  </p>

                  <Link
                    className="btn btn-primary"
                    to={`/mascotas/detalle/${mascota.id}`}
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MascotaList;