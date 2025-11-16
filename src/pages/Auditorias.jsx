import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuditorias, useCreateAuditoria } from '../hooks/useAuditorias';
// import { format } from 'date-fns'; // Para formatar datas

function Auditorias() {
  // 1. Busca dados da API (vem do cache ou da rede)
  const { data: auditorias, isLoading, error } = useAuditorias();
  
  // 2. Hook para a mutação de criar
  const createMutation = useCreateAuditoria();
  
  // 3. Hook para gerenciar o formulário
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // 4. Função chamada no submit do formulário
  const onSubmit = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset(); // Limpa o formulário após o sucesso
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestão de Auditorias</h2>
      
      {/* Formulário de Criação */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
        <h3>Nova Auditoria</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome do Projeto: </label>
          <input 
            {...register('nomeProjeto', { required: 'Campo obrigatório' })} 
          />
          {errors.nomeProjeto && <span style={{ color: 'red' }}> {errors.nomeProjeto.message}</span>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Auditor: </label>
          <input 
            {...register('auditor', { required: 'Campo obrigatório' })} 
          />
          {errors.auditor && <span style={{ color: 'red' }}> {errors.auditor.message}</span>}
        </div>
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Criando...' : 'Criar Auditoria'}
        </button>
      </form>

      {/* Lista de Auditorias */}
      <h3>Auditorias Existentes</h3>
      {isLoading && <p>Carregando auditorias...</p>}
      {error && <p>Ocorreu um erro ao buscar as auditorias.</p>}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {auditorias?.map(auditoria => (
          <li key={auditoria.id} style={{ marginBottom: '10px', border: '1px solid #eee', padding: '10px' }}>
            <Link to={`/auditoria/${auditoria.id}`} style={{ fontSize: '1.2em', textDecoration: 'none' }}>
              <strong>{auditoria.nomeProjeto}</strong>
            </Link>
            <span style={{ marginLeft: '10px', color: auditoria.finalizada ? 'green' : 'orange' }}>
              ({auditoria.finalizada ? 'Finalizada' : 'Em Andamento'})
            </span>
            <div>
              <small>Auditor: {auditoria.auditor}</small>
              {/* <small> | Data: {format(new Date(auditoria.dataAuditoria), 'dd/MM/yyyy')}</small> */}
            </div>
            {auditoria.finalizada && (
              <div style={{ color: 'blue' }}>
                Aderência: {auditoria.percentualAderencia}%
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Auditorias;