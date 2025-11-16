import React from 'react';
import { Sidebar } from './Sidebar';

const layoutStyle = {
  display: 'flex',
  minHeight: '100vh'
};

const contentStyle = {
  flex: 1,
  padding: '20px'
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