import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/naoConformidadeApi';
import { toast } from 'react-toastify';

const QUERY_KEY = 'naoConformidades';

// Hook para buscar TODAS as NCs
export const useNaoConformidades = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: api.getNaoConformidades,
  });
};

// Hook para buscar NCs ABERTAS
export const useNCAbertas = () => {
  return useQuery({
    queryKey: [QUERY_KEY, 'abertas'],
    queryFn: api.getNCAbertas,
  });
};

// Hook para buscar NCs ATRASADAS
export const useNCAtrasadas = () => {
  return useQuery({
    queryKey: [QUERY_KEY, 'atrasadas'],
    queryFn: api.getNCAtrasadas,
  });
};

// Hook para buscar UMA NC pelo ID
export const useNC = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.getNCById(id),
    enabled: !!id,
  });
};

// Hook para ATUALIZAR STATUS de uma NC
export const useUpdateNCStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateNCStatus, // Espera { id, status }
    onSuccess: (data) => {
      toast.success('Status da NC atualizado!');
      // Atualiza todos os caches relevantes
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

// Hook para RESOLVER uma NC
export const useResolverNC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.resolverNC, // Espera { id, solucao }
    onSuccess: (data) => {
      toast.success('Não Conformidade resolvida com sucesso!');
      // Atualiza todos os caches relevantes
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};

// Hook para ESCALONAR uma NC
export const useEscalonarNC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.escalonarNC, // Espera { id, superior, observacoes }
    onSuccess: (data) => {
      toast.warn('Não Conformidade escalonada!');
      // Atualiza todos os caches relevantes
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.setQueryData([QUERY_KEY, data.id], data);
    },
  });
};