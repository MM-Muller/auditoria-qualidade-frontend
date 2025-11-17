import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuditoria, useFinalizarAuditoria } from "../hooks/useAuditorias";
import { useChecklistItens } from "../hooks/useChecklist";
import { RespostaChecklist } from "../components/auditoria/RespostaChecklist";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const headerStyle = {
  borderBottom: "2px solid #eee",
  paddingBottom: "20px",
  marginBottom: "20px",
};

const pageTitleStyle = {
  fontSize: "2em",
  margin: 0,
};

const subHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "1.1em",
  color: "#555",
};

const finalizarBtnStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "12px 20px",
  fontSize: "1.1em",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "20px 0",
};

const backButtonStyle = {
  display: "inline-block",
  padding: "8px 14px",
  backgroundColor: "#6c757d",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  marginBottom: "20px",
  fontSize: "0.9em",
};

const finalizarBtnDisabledStyle = {
  ...finalizarBtnStyle,
  backgroundColor: "#ccc",
  cursor: "not-allowed",
};

function Auditoria() {
  const { id } = useParams();

  const {
    data: auditoria,
    isLoading: isLoadingAuditoria,
    error: errorAuditoria,
  } = useAuditoria(id);

  const {
    data: checklist,
    isLoading: isLoadingChecklist,
    error: errorChecklist,
  } = useChecklistItens();

  const finalizarMutation = useFinalizarAuditoria();

  const handleFinalizar = () => {
    if (
      window.confirm(
        "Tem certeza que deseja finalizar esta auditoria? Esta ação calcula os resultados e não pode ser desfeita."
      )
    ) {
      finalizarMutation.mutate(id);
    }
  };

  if (isLoadingAuditoria || isLoadingChecklist) {
    return <p>Carregando dados da auditoria e checklist...</p>;
  }
  if (errorAuditoria || errorChecklist) {
    return <p>Erro ao carregar a página. Verifique a ligação com a API.</p>;
  }
  if (!auditoria || !checklist) {
    return <p>Dados não encontrados.</p>;
  }

  return (
    <div>
      <Link to="/auditorias" style={backButtonStyle}>
        &larr; Voltar para Lista
      </Link>

      <div style={headerStyle}>
        <h2 style={pageTitleStyle}>{auditoria.nomeProjeto}</h2>
        <div style={subHeaderStyle}>
          <span>
            <strong>Auditor:</strong> {auditoria.auditor}
          </span>
          <span>
            <strong>Data:</strong>{" "}
            {format(new Date(auditoria.dataAuditoria), "dd/MM/yyyy HH:mm", {
              locale: ptBR,
            })}
          </span>
          <span>
            <strong>Status:</strong>
            <strong
              style={{
                color: auditoria.finalizada ? "green" : "orange",
                marginLeft: "5px",
              }}
            >
              {auditoria.finalizada ? "Finalizada" : "Em Andamento"}
            </strong>
          </span>
        </div>
      </div>

      {auditoria.finalizada && (
        <div
          style={{
            border: "2px solid green",
            padding: "15px",
            margin: "20px 0",
            backgroundColor: "#f0fff4",
            borderRadius: "8px",
          }}
        >
          <h3>Resultado Final</h3>
          <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            Percentual de Aderência: {auditoria.percentualAderencia}%
          </p>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>Total de Perguntas: {auditoria.totalPerguntas}</li>
            <li>Respostas Conformes (SIM): {auditoria.respostasConformes}</li>
            <li>
              Respostas Não Conformes (NAO): {auditoria.respostasNaoConformes}
            </li>
            <li>
              Respostas Não Aplicáveis (N/A): {auditoria.respostasNaoAplicaveis}
            </li>
          </ul>
        </div>
      )}

      {!auditoria.finalizada && (
        <>
          <button
            onClick={handleFinalizar}
            disabled={finalizarMutation.isPending}
            style={
              finalizarMutation.isPending
                ? finalizarBtnDisabledStyle
                : finalizarBtnStyle
            }
          >
            {finalizarMutation.isPending
              ? "Finalizando..."
              : "Finalizar e Calcular Resultado"}
          </button>

          <h3 style={{ marginTop: "20px" }}>Checklist de Execução</h3>

          {checklist.map((item) => {
            const respostaEncontrada = auditoria.respostas.find(
              (r) => r.itemChecklist.id === item.id
            );

            return (
              <RespostaChecklist
                key={item.id}
                auditoriaId={id}
                auditoria={auditoria}
                itemChecklist={item}
                respostaExistente={respostaEncontrada}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Auditoria;
