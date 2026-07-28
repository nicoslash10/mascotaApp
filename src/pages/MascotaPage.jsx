import { Routes, Route } from "react-router-dom";
import MascotaForm from "../components/MascotaForm";
import MascotaList from "../components/MascotaList";
import MascotaDetail from "../components/MascotaDetail";

function MascotaPage() {
  return (
    <Routes>
      <Route path="listar" element={<MascotaList />} />
      <Route path="crear" element={<MascotaForm />} />
      <Route path="detalle/:id" element={<MascotaDetail />} />
    </Routes>
  );
}

export default MascotaPage;