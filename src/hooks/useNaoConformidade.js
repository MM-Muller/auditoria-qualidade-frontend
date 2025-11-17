import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/naoConformidadeApi";
import { toast } from "react-toastify";

const QUERY_KEY = "naoConformidades";

export const useNaoConformidades = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: api.getNaoConformidades,
  });
};

export const useNCAbertas = () => {
  return useQuery({
    queryKey: [QUERY_KEY, "abertas"],
    queryFn: api.getNCAbertas,
  });
};

export const useNCAtrasadas = () => {
  return useQuery({
    queryKey: [QUERY_KEY, "atrasadas"],
    queryFn: api.getNCAtrasadas,
  });
};

export const useNC = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.getNCById(id),
    enabled: !!id,
  });
};

export const useUpdateNCStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateNCStatus,
    onSuccess: (data) => {
      toast.success("Status da NC atualizado!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

export const useResolverNC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.resolverNC,
    onSuccess: (data) => {
      toast.success("Não Conformidade resolvida com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

export const useEscalonarNC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.escalonarNC,
    onSuccess: (data) => {
      toast.warn("Não Conformidade escalonada!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

export const useEnviarEmailNC = () => {
  return useMutation({
    mutationFn: api.enviarEmailNC,
    onSuccess: () => {
      toast.success("Email de comunicação enviado!");
    },
  });
};
