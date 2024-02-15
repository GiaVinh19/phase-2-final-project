import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/rack">Rack</NavLink>
      <NavLink to="/racquet">Racquet</NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </nav>
    );
};

export default NavBar;
