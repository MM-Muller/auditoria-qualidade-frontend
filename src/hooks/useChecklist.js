import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/checklistApi';
import { toast } from 'react-toastify';

const QUERY_KEY = 'checklist';

// Hook para buscar TODOS os itens (ativos, pela sua API)
export const useChecklistItens = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: api.getChecklistItens,
  });
};

// Hook para buscar UM item pelo ID
export const useChecklistItem = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.getItemById(id),
    enabled: !!id, // Só executa a query se o ID for fornecido
  });
};

// Hook para buscar itens por CATEGORIA
export const useChecklistPorCategoria = (categoria) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'categoria', categoria],
    queryFn: () => api.getItensPorCategoria(categoria),
    enabled: !!categoria,
  });
};

// Hook para CRIAR um novo item no checklist
export const useCreateChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createItem,
    onSuccess: () => {
      toast.success('Item de checklist criado com sucesso!');
      // Invalida o cache para buscar a lista atualizada
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

// Hook para ATUALIZAR um item
export const useUpdateChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateItem, // Espera { id, itemData }
    onSuccess: (data) => {
      toast.success('Item atualizado com sucesso!');
      // Atualiza o cache da lista e do item específico
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

// Hook para DESATIVAR (exclusão lógica) um item
export const useDesativarChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.desativarItem,
    onSuccess: () => {
      toast.success('Item desativado com sucesso!');
      // Atualiza o cache
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};