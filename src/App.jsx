import NavBar from "./components/NavBar";
import MascotaPage from "./pages/MascotaPage";

function App() {
  return (
    <>
      <NavBar />

      <div className="container mt-4">
        <Routes>
          <Route path="/mascotas/*" element={<MascotaPage />} />

          <Route
            path="/"
            element={<Navigate to="/mascotas/listar" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

