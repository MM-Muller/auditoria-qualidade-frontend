import { useForm } from "react-hook-form";
import { Modal } from "../common/Modal";
import { useResolverNC } from "../../hooks/useNaoConformidade";

export const ResolveNCModal = ({ nc, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const resolverMutation = useResolverNC();

  if (!nc) {
    return null;
  }

  const onSubmit = (data) => {
    resolverMutation.mutate(
      {
        id: nc.id,
        solucao: data.solucao,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };
  const labelStyle = { fontWeight: "bold" };
  const textareaStyle = {
    minHeight: "100px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
  };
  const errorStyle = { color: "red", fontSize: "0.9em" };

  return (
    <Modal
      isOpen={!!nc}
      onClose={onClose}
      title={`Resolver NC: ${nc.codigoControle}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <div>
          <label style={labelStyle}>Solução Adotada:</label>
          <textarea
            style={textareaStyle}
            {...register("solucao", { required: "A solução é obrigatória." })}
          />
          {errors.solucao && (
            <span style={errorStyle}>{errors.solucao.message}</span>
          )}
        </div>

        <button
          type="submit"
          style={buttonStyle}
          disabled={resolverMutation.isPending}
        >
          {resolverMutation.isPending
            ? "Resolvendo..."
            : "Marcar como Resolvida"}
        </button>
      </form>
    </Modal>
  );
};
