import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Erro 404</h2>
      <p>Página não encontrada.</p>
      <Link to="/">Voltar para o Dashboard</Link>
    </div>
  );
}

export default NotFound;