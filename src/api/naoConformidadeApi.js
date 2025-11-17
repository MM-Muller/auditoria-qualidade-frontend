import apiClient from "./apiClient";

export const getNaoConformidades = async () => {
  const { data } = await apiClient.get("/nao-conformidades");
  return data;
};

export const getNCAbertas = async () => {
  const { data } = await apiClient.get("/nao-conformidades/abertas");
  return data;
};

export const getNCAtrasadas = async () => {
  const { data } = await apiClient.get("/nao-conformidades/atrasadas");
  return data;
};

export const getNCById = async (id) => {
  const { data } = await apiClient.get(`/nao-conformidades/${id}`);
  return data;
};

export const getNCporResponsavel = async (responsavel) => {
  const { data } = await apiClient.get(
    `/nao-conformidades/responsavel/${responsavel}`
  );
  return data;
};

export const updateNCStatus = async ({ id, status }) => {
  const { data } = await apiClient.put(`/nao-conformidades/${id}/status`, {
    status,
  });
  return data;
};

export const resolverNC = async ({ id, solucao }) => {
  const { data } = await apiClient.put(`/nao-conformidades/${id}/resolver`, {
    solucao,
  });
  return data;
};

export const escalonarNC = async ({ id, superior, observacoes }) => {
  const { data } = await apiClient.post(`/nao-conformidades/${id}/escalonar`, {
    superior,
    observacoes,
  });
  return data;
};

export const createNC = async (ncData) => {
  const { data } = await apiClient.post("/nao-conformidades", ncData);
  return data;
};
