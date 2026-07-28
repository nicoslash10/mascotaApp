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
      console.error("Error al registrar la mascota:", error);
    }
  };

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

    