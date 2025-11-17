import React, { useState } from "react";
import { useNCAbertas, useNCAtrasadas } from "../hooks/useNaoConformidade";
import { ResolveNCModal } from "../components/naoConformidade/ResolveNCModal";
import { EscalonaNCModal } from "../components/naoConformidade/EscalonaNCModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./NaoConformidades.css";

function NaoConformidades() {
  const [ncParaResolver, setNcParaResolver] = useState(null);
  const [ncParaEscalonar, setNcParaEscalonar] = useState(null);

  const { data: ncsAbertas, isLoading: isLoadingAbertas } = useNCAbertas();
  const { data: ncsAtrasadas, isLoading: isLoadingAtrasadas } =
    useNCAtrasadas();

  const renderNCItem = (nc) => (
    <li key={nc.id} className="nc-item">
      <div className="nc-item-header">
        <h3>{nc.codigoControle}</h3>
        <span className={`nc-item-status status-${nc.status}`}>
          {nc.status}
        </span>
      </div>

      <div className="nc-item-details">
        <span>
          <strong>Classificação:</strong> {nc.classificacao}
        </span>
        <span>
          <strong>Responsável:</strong> {nc.responsavel || "N/D"}
        </span>
        <span>
          <strong>Data Solicitação:</strong>
          {format(new Date(nc.dataSolicitacao), "dd/MM/yyyy", { locale: ptBR })}
        </span>
        <span style={{ color: "red", fontWeight: "bold" }}>
          <strong>Prazo Final:</strong>
          {format(new Date(nc.prazoResolucao), "dd/MM/yyyy", { locale: ptBR })}
        </span>
      </div>

      <div className="nc-item-actions">
        <button className="btn-resolver" onClick={() => setNcParaResolver(nc)}>
          Resolver
        </button>
        <button
          className="btn-escalonar"
          onClick={() => setNcParaEscalonar(nc)}
        >
          Escalonar
        </button>
      </div>
    </li>
  );

  return (
    <div className="nc-page-container">
      <h2>Gestão de Não Conformidades (NCs)</h2>

      <h3 style={{ color: "darkred" }}>🚨 Atrasadas (Prioridade)</h3>
      {isLoadingAtrasadas && <p>Carregando NCs atrasadas...</p>}
      <ul className="nc-list">
        {ncsAtrasadas?.length > 0
          ? ncsAtrasadas.map(renderNCItem)
          : !isLoadingAtrasadas && <p>Nenhuma NC atrasada. Bom trabalho!</p>}
      </ul>

      <hr style={{ margin: "30px 0" }} />

      <h3>Todas as NCs Abertas</h3>
      {isLoadingAbertas && <p>Carregando NCs abertas...</p>}
      <ul className="nc-list">
        {ncsAbertas?.length > 0
          ? ncsAbertas.map(renderNCItem)
          : !isLoadingAbertas && <p>Nenhuma NC aberta no momento.</p>}
      </ul>

      <ResolveNCModal
        nc={ncParaResolver}
        onClose={() => setNcParaResolver(null)}
      />

      <EscalonaNCModal
        nc={ncParaEscalonar}
        onClose={() => setNcParaEscalonar(null)}
      />
    </div>
  );
}

export default NaoConformidades;
