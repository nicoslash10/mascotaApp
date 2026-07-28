import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">
        MascotasApp
      </NavLink>

      <div className="navbar-nav">
        <NavLink className="nav-link" to="/">
          Mascotas
        </NavLink>

        <NavLink className="nav-link" to="/mascotas/crear">
          Registrar Mascota
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;