import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MascotaForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [estado, setEstado] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [tamano, setTamano] = useState("");

  const [opciones, setOpciones] = useState(null);
  const [errores, setErrores] = useState({});

  const navigate = useNavigate();

  const cargarOpciones = async () => {
    try {
      const response = await api.get("choices/");

      console.log("Opciones cargadas:", response.data);

      setOpciones(response.data);
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.log(error.response?.headers);
      console.log(error.message);

      const status = error.response?.status;

      switch (status) {
        case 400:
          setErrores({
            general: "No se pudieron validar las opciones del formulario",
          });
          break;

        case 404:
          setErrores({
            general: "No se encontraron las opciones del formulario",
          });
          break;

        default:
          setErrores({
            general: "No se pudieron cargar las opciones. Revise su conexión",
          });
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrores({});

    if (!nombre.trim()) {
      setErrores({
        nombre: ["Debe ingresar el nombre de la mascota"],
      });
      return;
    }

    if (nombre.trim().length > 100) {
      setErrores({
        nombre: ["El nombre no puede tener más de 100 caracteres"],
      });
      return;
    }

    if (!descripcion.trim()) {
      setErrores({
        descripcion: ["Debe ingresar la descripción de la mascota"],
      });
      return;
    }

    if (!imagen) {
      setErrores({
        imagen: ["Debe seleccionar una imagen"],
      });
      return;
    }

    if (edad !== "" && Number(edad) < 0) {
      setErrores({
        edad: ["La edad debe ser mayor o igual a 0"],
      });
      return;
    }

    if (raza.trim().length > 100) {
      setErrores({
        raza: ["La raza no puede tener más de 100 caracteres"],
      });
      return;
    }

    const formData = new FormData();

    formData.append("nombre", nombre.trim());
    formData.append("descripcion", descripcion.trim());
    formData.append("imagen", imagen);

    if (estado) {
      formData.append("estado", estado);
    }

    if (tipoAnimal) {
      formData.append("tipo_animal", tipoAnimal);
    }

    if (edad !== "") {
      formData.append("edad", edad);
    }

    if (raza.trim()) {
      formData.append("raza", raza.trim());
    }

    if (sexo) {
      formData.append("sexo", sexo);
    }

    if (tamano) {
      formData.append("tamano", tamano);
    }

    addMascota(formData);
  };

  const addMascota = async (formData) => {
    try {
      const response = await api.post("mascotas/", formData);

      console.log("Mascota creada:", response.data);

      if (response.status === 201) {
        alert("Mascota registrada correctamente");
        navigate("/mascotas/listar");
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.log(error.response?.headers);
      console.log(error.message);

      const status = error.response?.status;
      const data = error.response?.data;

      switch (status) {
        case 400:
          setErrores(
            data ?? {
              general: "Error de validación. Revise los datos ingresados",
            },
          );
          break;

        case 404:
          setErrores({
            general: "No se encontró el recurso solicitado",
          });
          break;

        default:
          setErrores({
            general:
              "No se pudo registrar la mascota. Revise su conexión e inténtelo nuevamente",
          });
          break;
      }
    }
  };

  useEffect(() => {
    cargarOpciones();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Registrar Mascota</h2>

      {errores.general && (
        <div className="alert alert-danger">{errores.general}</div>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>

          <input
            type="text"
            className="form-control"
            maxLength="100"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          {errores.nombre && (
            <p className="text-danger">{errores.nombre[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>

          <textarea
            className="form-control"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {errores.descripcion && (
            <p className="text-danger">{errores.descripcion[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />

          {errores.imagen && (
            <p className="text-danger">{errores.imagen[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Estado</label>

          <select
            className="form-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Usar valor por defecto</option>

            {opciones?.estado?.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>

          {errores.estado && (
            <p className="text-danger">{errores.estado[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de animal</label>

          <select
            className="form-select"
            value={tipoAnimal}
            onChange={(e) => setTipoAnimal(e.target.value)}
          >
            <option value="">Usar valor por defecto</option>

            {opciones?.tipo_animal?.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>

          {errores.tipo_animal && (
            <p className="text-danger">{errores.tipo_animal[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Edad</label>

          <input
            type="number"
            min="0"
            className="form-control"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />

          {errores.edad && (
            <p className="text-danger">{errores.edad[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Raza</label>

          <input
            type="text"
            className="form-control"
            maxLength="100"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
          />

          {errores.raza && (
            <p className="text-danger">{errores.raza[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Sexo</label>

          <select
            className="form-select"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="">Usar valor por defecto</option>

            {opciones?.sexo?.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>

          {errores.sexo && (
            <p className="text-danger">{errores.sexo[0]}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Tamaño</label>

          <select
            className="form-select"
            value={tamano}
            onChange={(e) => setTamano(e.target.value)}
          >
            <option value="">Usar valor por defecto</option>

            {opciones?.tamano?.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>

          {errores.tamano && (
            <p className="text-danger">{errores.tamano[0]}</p>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          Registrar Mascota
        </button>
      </form>
    </div>
  );
}

export default MascotaForm;