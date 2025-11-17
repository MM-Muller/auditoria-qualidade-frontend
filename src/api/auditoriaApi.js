import apiClient from "./apiClient";

export const getAuditorias = async () => {
  const { data } = await apiClient.get("/auditorias");
  return data;
};

export const getAuditoriaById = async (id) => {
  const { data } = await apiClient.get(`/auditorias/${id}`);
  return data;
};

export const createAuditoria = async (auditoriaData) => {
  const { data } = await apiClient.post("/auditorias", auditoriaData);
  return data;
};

export const addResposta = async ({ auditoriaId, respostaData }) => {
  const { data } = await apiClient.post(
    `/auditorias/${auditoriaId}/respostas`,
    respostaData
  );
  return data;
};

export const finalizarAuditoria = async (auditoriaId) => {
  const { data } = await apiClient.put(`/auditorias/${auditoriaId}/finalizar`);
  return data;
};

export const getAuditoriasPorProjeto = async (nomeProjeto) => {
  const { data } = await apiClient.get(`/auditorias/projeto/${nomeProjeto}`);
  return data;
};

export const getAuditoriasPorAuditor = async (auditor) => {
  const { data } = await apiClient.get(`/auditorias/auditor/${auditor}`);
  return data;
};
