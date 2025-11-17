import { useForm } from "react-hook-form";
import { Modal } from "../common/Modal";
import { useEscalonarNC } from "../../hooks/useNaoConformidade";

export const EscalonaNCModal = ({ nc, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const escalonarMutation = useEscalonarNC();

  if (!nc) {
    return null;
  }

  const onSubmit = (data) => {
    escalonarMutation.mutate(
      {
        id: nc.id,
        superior: data.superior,
        observacoes: data.observacoes,
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
  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const textareaStyle = { minHeight: "100px", ...inputStyle };
  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#f0ad4e",
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
      title={`Escalonar NC: ${nc.codigoControle}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <div>
          <label style={labelStyle}>
            Superior Responsável (para escalonamento):
          </label>
          <input
            style={inputStyle}
            {...register("superior", {
              required: "O nome do superior é obrigatório.",
            })}
          />
          {errors.superior && (
            <span style={errorStyle}>{errors.superior.message}</span>
          )}
        </div>

        <div>
          <label style={labelStyle}>Observações:</label>
          <textarea
            style={textareaStyle}
            {...register("observacoes", {
              required: "As observações são obrigatórias.",
            })}
          />
          {errors.observacoes && (
            <span style={errorStyle}>{errors.observacoes.message}</span>
          )}
        </div>

        <button
          type="submit"
          style={buttonStyle}
          disabled={escalonarMutation.isPending}
        >
          {escalonarMutation.isPending ? "Escalonando..." : "Escalonar NC"}
        </button>
      </form>
    </Modal>
  );
};
