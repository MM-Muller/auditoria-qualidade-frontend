import React from 'react';

// Página Dashboard (ex: mostrar NCs abertas ou atrasadas)
function Dashboard() {
  return (
    <div>
      <h2>Dashboard de Qualidade</h2>
      <p>Bem-vindo ao sistema de auditoria.</p>
      
      {/* Aqui você pode usar os hooks:
        - useNCAbertas()
        - useNCAtrasadas()
        ...e exibir os resultados em cartões.
      */}
    </div>
  );
}

export default Dashboard;