import apiClient from "./apiClient";

export const getChecklistItens = async () => {
  const { data } = await apiClient.get("/checklist");
  return data;
};

export const getItemById = async (id) => {
  const { data } = await apiClient.get(`/checklist/${id}`);
  return data;
};

export const getItensPorCategoria = async (categoria) => {
  const { data } = await apiClient.get(`/checklist/categoria/${categoria}`);
  return data;
};

export const createItem = async (itemData) => {
  const { data } = await apiClient.post("/checklist", itemData);
  return data;
};

export const updateItem = async ({ id, itemData }) => {
  const { data } = await apiClient.put(`/checklist/${id}`, itemData);
  return data;
};

export const desativarItem = async (id) => {
  await apiClient.delete(`/checklist/${id}`);
};
