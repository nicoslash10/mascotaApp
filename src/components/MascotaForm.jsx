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

    