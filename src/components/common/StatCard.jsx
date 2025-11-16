import React from 'react';
import './StatCard.css';

/**
 * Um cartão para exibir uma estatística.
 * Props:
 * - title (string): O título (ex: "NCs Abertas")
 * - value (number): O número a ser exibido
 * - color (string): Cor de fundo (opcional)
 * - isLoading (boolean): Mostra "Carregando..."
 */
export const StatCard = ({ title, value, color = '#fff', isLoading = false }) => {
  const cardStyle = {
    backgroundColor: color,
    border: color !== '#fff' ? `2px solid ${color}` : '1px solid #ddd',
    color: '#333' // Texto escuro para fundos claros
  };

  // Ajuste de cor para fundos claros, mas não brancos
  if (color.startsWith('#f') && color !== '#fff') {
     cardStyle.color = '#555';
  }

  // Cor específica para NCs Atrasadas
  if (title.includes('Atrasadas')) {
      cardStyle.backgroundColor = '#dc3545';
      cardStyle.borderColor = '#dc3545';
      cardStyle.color = '#fff';
  }

  return (
    <div className="stat-card" style={cardStyle}>
      <div className="stat-value">
        {isLoading ? '...' : value}
      </div>
      <div className="stat-title">
        {title}
      </div>
    </div>
  );
};