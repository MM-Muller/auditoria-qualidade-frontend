import React, { useState } from 'react';
import { useChecklistItens, useDesativarChecklistItem } from '../hooks/useChecklist';
import { ChecklistForm } from '../components/admin/ChecklistForm';
import './ChecklistAdmin.css'; // Importa o CSS

function ChecklistAdmin() {
  // 1. Estado para controlar qual item está em edição
  const [itemEmEdicao, setItemEmEdicao] = useState(null);

  // 2. Busca todos os itens do checklist
  const { data: itens, isLoading, error } = useChecklistItens();

  // 3. Hook para a mutação de "Desativar"
  const desativarMutation = useDesativarChecklistItem();

  const handleDesativar = (id) => {
    if (window.confirm('Tem certeza que deseja desativar este item? Ele não aparecerá em novas auditorias.')) {
      desativarMutation.mutate(id);
    }
  };

  // 4. Função para limpar o formulário (passada para o componente filho)
  const handleOnDone = () => {
    setItemEmEdicao(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin de Itens do Checklist</h2>

      {/* O formulário. 
        - Se 'itemEmEdicao' for nulo, ele está em modo "Criar".
        - Se tiver um item, ele entra em modo "Editar".
      */}
      <ChecklistForm itemToEdit={itemEmEdicao} onDone={handleOnDone} />
      
      <hr />

      {/* Lista de Itens Existentes */}
      <h3>Itens Ativos no Checklist</h3>
      {isLoading && <p>Carregando itens...</p>}
      {error && <p>Erro ao carregar itens.</p>}

      <ul className="admin-list">
        {itens?.map(item => (
          <li key={item.id} className="admin-item">
            <div className="admin-item-info">
              <strong>{item.numero}. {item.descricao}</strong>
              <small>Categoria: {item.categoria}</small>
            </div>
            
            <div className="admin-item-actions">
              <button 
                className="btn-edit" 
                onClick={() => setItemEmEdicao(item)}
                disabled={desativarMutation.isPending}
              >
                Editar
              </button>
              <button 
                className="btn-desativar"
                onClick={() => handleDesativar(item.id)}
                disabled={desativarMutation.isPending}
              >
                {desativarMutation.isPending ? '...' : 'Desativar'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChecklistAdmin;