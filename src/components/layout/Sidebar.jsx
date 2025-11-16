import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Vamos criar este CSS básico

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>Qualidade App</h3>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" end>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/auditorias">Auditorias</NavLink>
        </li>
        <li>
          <NavLink to="/nao-conformidades">Não Conformidades</NavLink>
        </li>
        <li>
          <NavLink to="/admin/checklist">Admin Checklist</NavLink>
        </li>
      </ul>
    </nav>
  );
};