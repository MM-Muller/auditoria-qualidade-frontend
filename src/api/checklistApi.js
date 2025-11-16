import apiClient from './apiClient';

// GET /api/checklist (O seu DataInitializer já popula isso)
export const getChecklistItens = async () => {
  const { data } = await apiClient.get('/checklist');
  return data;
};

// GET /api/checklist/{id}
export const getItemById = async (id) => {
  const { data } = await apiClient.get(`/checklist/${id}`);
  return data;
};

// GET /api/checklist/categoria/{categoria}
export const getItensPorCategoria = async (categoria) => {
  const { data } = await apiClient.get(`/checklist/categoria/${categoria}`);
  return data;
};

// POST /api/checklist
export const createItem = async (itemData) => {
  const { data } = await apiClient.post('/checklist', itemData);
  return data;
};

// PUT /api/checklist/{id}
export const updateItem = async ({ id, itemData }) => {
  const { data } = await apiClient.put(`/checklist/${id}`, itemData);
  return data;
};

// DELETE /api/checklist/{id}
export const desativarItem = async (id) => {
  await apiClient.delete(`/checklist/${id}`);
};