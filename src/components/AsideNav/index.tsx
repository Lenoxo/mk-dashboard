import { NavLink } from "react-router-dom";
import "./styles.css";

export function AsideNav() {
  return (
    <aside>
      Later on, this will be a working sidebar
      <br />
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/history">History</NavLink>
      <NavLink to="/">Home</NavLink>
    </aside>
  );
}
