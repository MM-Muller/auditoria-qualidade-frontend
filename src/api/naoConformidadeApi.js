import apiClient from './apiClient';

// GET /api/nao-conformidades
export const getNaoConformidades = async () => {
  const { data } = await apiClient.get('/nao-conformidades');
  return data;
};

// GET /api/nao-conformidades/abertas
export const getNCAbertas = async () => {
  const { data } = await apiClient.get('/nao-conformidades/abertas');
  return data;
};

// GET /api/nao-conformidades/atrasadas
export const getNCAtrasadas = async () => {
  const { data } = await apiClient.get('/nao-conformidades/atrasadas');
  return data;
};

// GET /api/nao-conformidades/{id}
export const getNCById = async (id) => {
  const { data } = await apiClient.get(`/nao-conformidades/${id}`);
  return data;
};

// GET /api/nao-conformidades/responsavel/{responsavel}
export const getNCporResponsavel = async (responsavel) => {
  const { data } = await apiClient.get(`/nao-conformidades/responsavel/${responsavel}`);
  return data;
};

// PUT /api/nao-conformidades/{id}/status
export const updateNCStatus = async ({ id, status }) => {
  const { data } = await apiClient.put(`/nao-conformidades/${id}/status`, { status });
  return data;
};

// PUT /api/nao-conformidades/{id}/resolver
export const resolverNC = async ({ id, solucao }) => {
  const { data } = await apiClient.put(`/nao-conformidades/${id}/resolver`, { solucao });
  return data;
};

// POST /api/nao-conformidades/{id}/escalonar
export const escalonarNC = async ({ id, superior, observacoes }) => {
  const { data } = await apiClient.post(`/nao-conformidades/${id}/escalonar`, { superior, observacoes });
  return data;
};

// POST /api/nao-conformidades (Criar NC manual, se necessário)
export const createNC = async (ncData) => {
  const { data } = await apiClient.post('/nao-conformidades', ncData);
  return data;
};