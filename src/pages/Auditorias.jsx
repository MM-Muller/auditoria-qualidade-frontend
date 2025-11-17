import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuditorias, useCreateAuditoria } from "../hooks/useAuditorias";
import "./Auditorias.css";

function Auditorias() {
  const { data: auditorias, isLoading, error } = useAuditorias();

  const createMutation = useCreateAuditoria();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const formStyle = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "30px",
    backgroundColor: "#f9f9f9",
  };
  const fieldGroupStyle = {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  };
  const labelStyle = { fontWeight: "bold", marginBottom: "5px" };
  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
  };
  const errorStyle = { color: "red", fontSize: "0.9em", marginTop: "5px" };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestão de Auditorias</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h3>Nova Auditoria</h3>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Nome do Projeto:</label>
          <input
            style={inputStyle}
            {...register("nomeProjeto", { required: "Campo obrigatório" })}
          />
          {errors.nomeProjeto && (
            <span style={errorStyle}> {errors.nomeProjeto.message}</span>
          )}
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Auditor:</label>
          <input
            style={inputStyle}
            {...register("auditor", { required: "Campo obrigatório" })}
          />
          {errors.auditor && (
            <span style={errorStyle}> {errors.auditor.message}</span>
          )}
        </div>
        <button
          type="submit"
          style={buttonStyle}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Criando..." : "Criar Auditoria"}
        </button>
      </form>

      <h3>Auditorias Existentes</h3>
      {isLoading && <p>Carregando auditorias...</p>}
      {error && <p>Ocorreu um erro ao buscar as auditorias.</p>}

      <ul className="auditoria-list">
        {auditorias?.map((auditoria) => (
          <li key={auditoria.id} className="auditoria-item">
            <div className="auditoria-info">
              <h3>
                {auditoria.nomeProjeto}
                <span
                  className={`auditoria-status ${
                    auditoria.finalizada
                      ? "status-finalizada"
                      : "status-andamento"
                  }`}
                >
                  ({auditoria.finalizada ? "Finalizada" : "Em Andamento"})
                </span>
              </h3>
              <small>Auditor: {auditoria.auditor}</small>
              {auditoria.finalizada && (
                <div className="auditoria-aderencia">
                  Aderência: {auditoria.percentualAderencia}%
                </div>
              )}
            </div>

            <div className="auditoria-actions">
              {auditoria.finalizada ? (
                <Link to={`/auditoria/${auditoria.id}`} className="btn-exibir">
                  Exibir Dados
                </Link>
              ) : (
                <Link to={`/auditoria/${auditoria.id}`} className="btn-iniciar">
                  Iniciar/Continuar
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Auditorias;
