import apiClient from './apiClient';

// GET /api/auditorias
export const getAuditorias = async () => {
  const { data } = await apiClient.get('/auditorias');
  return data;
};

// GET /api/auditorias/{id}
export const getAuditoriaById = async (id) => {
  const { data } = await apiClient.get(`/auditorias/${id}`);
  return data;
};

// POST /api/auditorias
export const createAuditoria = async (auditoriaData) => {
  // auditoriaData: { nomeProjeto: "...", auditor: "..." }
  const { data } = await apiClient.post('/auditorias', auditoriaData);
  return data;
};

// POST /api/auditorias/{id}/respostas
export const addResposta = async ({ auditoriaId, respostaData }) => {
  // respostaData: { itemChecklist: { id: 1 }, resultado: "SIM", observacoes: "..." }
  const { data } = await apiClient.post(`/auditorias/${auditoriaId}/respostas`, respostaData);
  return data;
};

// PUT /api/auditorias/{id}/finalizar
export const finalizarAuditoria = async (auditoriaId) => {
  const { data } = await apiClient.put(`/auditorias/${auditoriaId}/finalizar`);
  return data;
};

// GET /api/auditorias/projeto/{nomeProjeto}
export const getAuditoriasPorProjeto = async (nomeProjeto) => {
  const { data } = await apiClient.get(`/auditorias/projeto/${nomeProjeto}`);
  return data;
};

// GET /api/auditorias/auditor/{auditor}
export const getAuditoriasPorAuditor = async (auditor) => {
  const { data } = await apiClient.get(`/auditorias/auditor/${auditor}`);
  return data;
};