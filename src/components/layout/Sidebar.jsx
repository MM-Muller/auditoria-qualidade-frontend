import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>Ferramenta Auditoria</h3>
        <h3>Capacitação</h3>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/checklist">Perguntas do Checklist</NavLink>
        </li>
        <li>
          <NavLink to="/auditorias">Auditorias</NavLink>
        </li>
        <li>
          <NavLink to="/nao-conformidades">Não Conformidades</NavLink>
        </li>
      </ul>
    </nav>
  );
};
