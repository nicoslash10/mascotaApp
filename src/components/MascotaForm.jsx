import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MascotaForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [estado, setEstado] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [tamano, setTamano] = useState("");

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
      // Aquí se agregará la llamada a la API
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrar mascota</h1>
    </form>
  );
}

export default MascotaForm;