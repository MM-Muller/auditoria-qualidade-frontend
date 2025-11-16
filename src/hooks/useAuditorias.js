import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/auditoriaApi';
import { toast } from 'react-toastify';

const QUERY_KEY = 'auditorias';

// Hook para buscar TODAS as auditorias
export const useAuditorias = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: api.getAuditorias,
  });
};

// Hook para buscar UMA auditoria pelo ID
export const useAuditoria = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.getAuditoriaById(id),
    enabled: !!id, // Só executa a query se o ID for fornecido
  });
};

// Hook para CRIAR uma nova auditoria
export const useCreateAuditoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createAuditoria,
    onSuccess: () => {
      toast.success('Auditoria criada com sucesso!');
      // Invalida o cache de 'auditorias' para buscar a lista atualizada
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

// Hook para FINALIZAR uma auditoria
export const useFinalizarAuditoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.finalizarAuditoria,
    onSuccess: (data) => {
      toast.success('Auditoria finalizada!');
      // Atualiza o cache da lista e da auditoria específica
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

// Hook para ADICIONAR uma resposta
export const useAddResposta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.addResposta,
    onSuccess: (data) => {
      toast.success('Resposta salva!');
      // Atualiza o cache da auditoria específica com os novos dados
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};