import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/checklistApi";
import { toast } from "react-toastify";

const QUERY_KEY = "checklist";

export const useChecklistItens = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: api.getChecklistItens,
  });
};

export const useChecklistItem = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.getItemById(id),
    enabled: !!id,
  });
};

export const useChecklistPorCategoria = (categoria) => {
  return useQuery({
    queryKey: [QUERY_KEY, "categoria", categoria],
    queryFn: () => api.getItensPorCategoria(categoria),
    enabled: !!categoria,
  });
};

export const useCreateChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createItem,
    onSuccess: () => {
      toast.success("Item de checklist criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useUpdateChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateItem,
    onSuccess: (data) => {
      toast.success("Item atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

export const useDesativarChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.desativarItem,
    onSuccess: () => {
      toast.success("Item desativado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
