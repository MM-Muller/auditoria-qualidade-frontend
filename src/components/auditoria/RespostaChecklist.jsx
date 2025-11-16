import React, { useState, useEffect } from 'react';
import { useAddResposta } from '../../hooks/useAuditorias';
import './RespostaChecklist.css'; // Vamos criar este CSS

/**
 * Este componente recebe:
 * - auditoriaId: O ID da auditoria atual
 * - itemChecklist: O objeto do item (com id, descricao, categoria)
 * - respostaExistente: A resposta já salva para este item (se houver)
 */
export const RespostaChecklist = ({ auditoriaId, itemChecklist, respostaExistente }) => {
  // Estado para os campos do formulário
  const [resultado, setResultado] = useState('');
  const [observacoes, setObservacoes] = useState('');

  // Hook para a mutação de adicionar/atualizar resposta
  const addRespostaMutation = useAddResposta();

  // Efeito para carregar os dados existentes quando o componente montar
  useEffect(() => {
    if (respostaExistente) {
      setResultado(respostaExistente.resultado);
      setObservacoes(respostaExistente.observacoes || '');
    } else {
      // Se não houver resposta, reseta o estado
      setResultado('');
      setObservacoes('');
    }
    // Dependências: recalcula se o item ou a resposta existente mudar
  }, [itemChecklist, respostaExistente]);

  // Função para salvar a resposta
  const handleSave = () => {
    if (!resultado) {
      alert('Por favor, selecione um resultado (SIM, NAO, ou N/A).');
      return;
    }

    const respostaData = {
      // O backend espera o objeto, não apenas o ID
      itemChecklist: { id: itemChecklist.id }, 
      resultado: resultado,
      observacoes: observacoes,
      // A lógica de `geraNC` será tratada pelo backend (ou aqui, se necessário)
      // geraNC: resultado === 'NAO' 
    };

    addRespostaMutation.mutate({ 
      auditoriaId, 
      respostaData 
    });
  };

  return (
    <div className={`resposta-container ${addRespostaMutation.isPending ? 'saving' : ''}`}>
      <div className="resposta-header">
        <span className="categoria">{itemChecklist.categoria}</span>
        <strong className="numero">Item {itemChecklist.numero}</strong>
      </div>
      
      <p className="descricao">{itemChecklist.descricao}</p>

      <div className="botoes-resultado">
        <button
          className={`btn-res ${resultado === 'SIM' ? 'active-sim' : ''}`}
          onClick={() => setResultado('SIM')}
        >
          SIM
        </button>
        <button
          className={`btn-res ${resultado === 'NAO' ? 'active-nao' : ''}`}
          onClick={() => setResultado('NAO')}
        >
          NAO
        </button>
        <button
          className={`btn-res ${resultado === 'N/A' ? 'active-na' : ''}`}
          onClick={() => setResultado('N/A')}
        >
          N/A
        </button>
      </div>

      <textarea
        className="observacoes"
        placeholder="Observações (obrigatório se for 'NAO')"
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
      />

      <button
        className="btn-salvar"
        onClick={handleSave}
        disabled={addRespostaMutation.isPending}
      >
        {addRespostaMutation.isPending ? 'Salvando...' : 'Salvar Resposta'}
      </button>

      {/* Se o resultado for NAO, mostra um aviso */}
      {resultado === 'NAO' && (
        <div className="aviso-nc">
          Esta resposta irá gerar uma <strong>Não Conformidade (NC)</strong>.
        </div>
      )}
    </div>
  );
};