import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/auditoriaApi";
import { toast } from "react-toastify";

const QUERY_KEY = "auditorias";

export const useAuditorias = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: api.getAuditorias,
  });
};

export const useAuditoria = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.getAuditoriaById(id),
    enabled: !!id,
  });
};

export const useCreateAuditoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createAuditoria,
    onSuccess: () => {
      toast.success("Auditoria criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useFinalizarAuditoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.finalizarAuditoria,
    onSuccess: (data) => {
      toast.success("Auditoria finalizada!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

export const useAddResposta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.addResposta,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};
