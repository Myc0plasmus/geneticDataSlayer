import { NavLink } from "react-router-dom";

export default function Tabs() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/generator">Instance generator settings</NavLink>
      <NavLink to="/settings">Heuristic settings</NavLink>
      <NavLink to="/results">Heuristic results</NavLink>
    </nav>
  );
}
