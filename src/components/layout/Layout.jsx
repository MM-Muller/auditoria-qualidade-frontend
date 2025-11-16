import React from 'react';
import { Sidebar } from './Sidebar';

const layoutStyle = {
  display: 'flex',
  minHeight: '100vh'
};

const contentStyle = {
  flex: 1,
  padding: '20px',
  overflowY: 'auto',  /* Adiciona a barra de rolagem AQUI */
  height: '100vh',     /* Garante que a altura seja a da tela */
  boxSizing: 'border-box' /* Impede problemas de padding */
};

export const Layout = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};