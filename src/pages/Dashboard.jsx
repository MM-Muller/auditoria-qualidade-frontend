import React from "react";
import { Link } from "react-router-dom";
import { useNCAbertas, useNCAtrasadas } from "../hooks/useNaoConformidade";
import { useAuditorias } from "../hooks/useAuditorias";
import { StatCard } from "../components/common/StatCard";
import "./Dashboard.css";

function Dashboard() {
  const { data: ncsAbertas, isLoading: isLoadingAbertas } = useNCAbertas();
  const { data: ncsAtrasadas, isLoading: isLoadingAtrasadas } =
    useNCAtrasadas();
  const { data: auditorias, isLoading: isLoadingAuditorias } = useAuditorias();

  return (
    <div>
      <h2>Dashboard de Qualidade</h2>
      <p>Resumo do estado atual do sistema de auditorias.</p>

      <div className="dashboard-grid">
        <StatCard
          title="NCs Atrasadas"
          value={ncsAtrasadas?.length}
          isLoading={isLoadingAtrasadas}
          color="#dc3545"
        />
        <StatCard
          title="NCs Abertas"
          value={ncsAbertas?.length}
          isLoading={isLoadingAbertas}
          color="#fff3cd"
        />
        <StatCard
          title="Auditorias Realizadas"
          value={auditorias?.length}
          isLoading={isLoadingAuditorias}
          color="#e2e3e5"
        />
      </div>

      <div className="dashboard-list-container">
        <h3>🚨 Ações Urgentes (NCs Atrasadas)</h3>
        {isLoadingAtrasadas && <p>Carregando...</p>}
        <ul className="dashboard-list">
          {ncsAtrasadas?.length > 0
            ? ncsAtrasadas.slice(0, 5).map((nc) => (
                <li key={nc.id}>
                  <Link to="/nao-conformidades">{nc.codigoControle}</Link>
                  <span className="prazo">Venceu em: {nc.prazoResolucao}</span>
                </li>
              ))
            : !isLoadingAtrasadas && (
                <p>Nenhuma NC atrasada. Ótimo trabalho!</p>
              )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
