import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuditoria, useFinalizarAuditoria } from '../hooks/useAuditorias';
import { useChecklistItens } from '../hooks/useChecklist';
import { RespostaChecklist } from '../components/auditoria/RespostaChecklist';
import { format } from 'date-fns'; // Para formatar datas
import { ptBR } from 'date-fns/locale'; // Para datas em português

// Um estilo simples para o cabeçalho da página
const headerStyle = {
  borderBottom: '2px solid #eee',
  paddingBottom: '20px',
  marginBottom: '20px',
};

const pageTitleStyle = {
  fontSize: '2em',
  margin: 0,
};

const subHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.1em',
  color: '#555',
};

// Estilos para o botão de Finalizar
const finalizarBtnStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '12px 20px',
  fontSize: '1.1em',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '20px 0',
};

const finalizarBtnDisabledStyle = {
  ...finalizarBtnStyle,
  backgroundColor: '#ccc',
  cursor: 'not-allowed',
};

function Auditoria() {
  const { id } = useParams();

  // 1. Buscar dados desta auditoria específica
  const { 
    data: auditoria, 
    isLoading: isLoadingAuditoria, 
    error: errorAuditoria 
  } = useAuditoria(id);
  
  // 2. Buscar TODOS os itens de checklist
  const { 
    data: checklist, 
    isLoading: isLoadingChecklist, 
    error: errorChecklist 
  } = useChecklistItens();

  // 3. Hook para a mutação de "Finalizar"
  const finalizarMutation = useFinalizarAuditoria();

  const handleFinalizar = () => {
    if (window.confirm('Tem certeza que deseja finalizar esta auditoria? Esta ação calcula os resultados e não pode ser desfeita.')) {
      finalizarMutation.mutate(id);
    }
  };

  // 4. Lidar com estados de carregamento e erro (de AMBAS as queries)
  if (isLoadingAuditoria || isLoadingChecklist) {
    return <p>Carregando dados da auditoria e checklist...</p>;
  }
  if (errorAuditoria || errorChecklist) {
    return <p>Erro ao carregar a página. Verifique a ligação com a API.</p>;
  }
  if (!auditoria || !checklist) {
    return <p>Dados não encontrados.</p>;
  }

  // 5. O "coração": Renderização da página
  return (
    <div>
      <Link to="/auditorias" style={{ textDecoration: 'none', color: '#007bff' }}>
        {"< Voltar para lista de auditorias"}
      </Link>
      
      <div style={headerStyle}>
        <h2 style={pageTitleStyle}>{auditoria.nomeProjeto}</h2>
        <div style={subHeaderStyle}>
          <span><strong>Auditor:</strong> {auditoria.auditor}</span>
          <span>
            <strong>Data:</strong> {format(new Date(auditoria.dataAuditoria), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
          </span>
          <span>
            <strong>Status:</strong> 
            <strong style={{ color: auditoria.finalizada ? 'green' : 'orange', marginLeft: '5px' }}>
              {auditoria.finalizada ? 'Finalizada' : 'Em Andamento'}
            </strong>
          </span>
        </div>
      </div>

      {/* Bloco 1: Se a auditoria estiver FINALIZADA, mostrar resultados */}
      {auditoria.finalizada && (
        <div style={{ border: '2px solid green', padding: '15px', margin: '20px 0', backgroundColor: '#f0fff4', borderRadius: '8px' }}>
          <h3>Resultado Final</h3>
          <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
            Percentual de Aderência: {auditoria.percentualAderencia}%
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li>Total de Perguntas: {auditoria.totalPerguntas}</li>
            <li>Respostas Conformes (SIM): {auditoria.respostasConformes}</li>
            <li>Respostas Não Conformes (NAO): {auditoria.respostasNaoConformes}</li>
            <li>Respostas Não Aplicáveis (N/A): {auditoria.respostasNaoAplicaveis}</li>
          </ul>
        </div>
      )}

      {/* Bloco 2: Se a auditoria NÃO estiver finalizada, mostrar checklist */}
      {!auditoria.finalizada && (
        <>
          <button 
            onClick={handleFinalizar} 
            disabled={finalizarMutation.isPending}
            style={finalizarMutation.isPending ? finalizarBtnDisabledStyle : finalizarBtnStyle}
          >
            {finalizarMutation.isPending ? 'Finalizando...' : 'Finalizar e Calcular Resultado'}
          </button>
          
          <h3 style={{ marginTop: '20px' }}>Checklist de Execução</h3>
          
          {/* Este é o .map() principal. 
            Itera sobre CADA item do checklist global.
          */}
          {checklist.map(item => {
            
            // Lógica para encontrar a resposta JÁ DADA para este item
            // O `auditoria.respostas` vem da API
            const respostaEncontrada = auditoria.respostas.find(
              r => r.itemChecklist.id === item.id
            );
            
            return (
              <RespostaChecklist
                key={item.id}
                auditoriaId={id}
                itemChecklist={item}
                respostaExistente={respostaEncontrada} // Passa a resposta (ou undefined)
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Auditoria;