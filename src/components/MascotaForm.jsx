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

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);
    formData.append("estado", estado);
    formData.append("tipoAnimal", tipoAnimal);
    formData.append("edad", edad);
    formData.append("raza", raza);
    formData.append("sexo", sexo);
    formData.append("tamano", tamano);

    try {
      await api.post("/mascotas/", formData);

      navigate("/");
    } catch (error) {
      console.error("Error al registrar la mascota:", error);
    }
  }

  useEffect(() => {
    cargarOpciones();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrar mascota</h1>
    </form>
  );
}

export default MascotaForm;