import React from 'react';
import './Modal.css';

/**
 * Componente Modal genérico
 * Props:
 * - isOpen (boolean): Controla se o modal está visível
 * - onClose (function): Função chamada ao fechar (clicar no 'X' ou no fundo)
 * - title (string): O título do modal
 * - children: O conteúdo (ex: um formulário)
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  // Impede que o clique dentro do modal feche ele
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // O fundo escuro (backdrop)
    <div className="modal-backdrop" onClick={onClose}>
      {/* O conteúdo do modal */}
      <div className="modal-content" onClick={handleModalContentClick}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};