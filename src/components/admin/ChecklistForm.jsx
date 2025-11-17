import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateChecklistItem,
  useUpdateChecklistItem,
} from "../../hooks/useChecklist";

export const ChecklistForm = ({ itemToEdit, onDone }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const createMutation = useCreateChecklistItem();
  const updateMutation = useUpdateChecklistItem();

  const isEditing = !!itemToEdit;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditing) {
      setValue("numero", itemToEdit.numero);
      setValue("categoria", itemToEdit.categoria);
      setValue("descricao", itemToEdit.descricao);
    } else {
      reset();
    }
  }, [itemToEdit, isEditing, setValue, reset]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: itemToEdit.id, itemData: data },
        {
          onSuccess: () => onDone(),
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => onDone(),
      });
    }
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
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
  };
  const errorStyle = { color: "red", fontSize: "0.9em", marginTop: "5px" };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h3>
        {isEditing
          ? `Editando Item: ${itemToEdit.numero}`
          : "Criar Novo Item de Checklist"}
      </h3>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Número de Ordem:</label>
        <input
          type="number"
          style={inputStyle}
          {...register("numero", { required: "Número é obrigatório" })}
        />
        {errors.numero && (
          <span style={errorStyle}>{errors.numero.message}</span>
        )}
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Categoria:</label>
        <input
          style={inputStyle}
          {...register("categoria", { required: "Categoria é obrigatória" })}
        />
        {errors.categoria && (
          <span style={errorStyle}>{errors.categoria.message}</span>
        )}
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Descrição do Item:</label>
        <textarea
          style={{ ...inputStyle, minHeight: "80px" }}
          {...register("descricao", { required: "Descrição é obrigatória" })}
        />
        {errors.descricao && (
          <span style={errorStyle}>{errors.descricao.message}</span>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: isEditing ? "#007bff" : "#28a745",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditing
              ? "Salvando..."
              : "Criando..."
            : isEditing
            ? "Salvar Alterações"
            : "Criar Item"}
        </button>

        {isEditing && (
          <button
            type="button"
            style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
            onClick={() => onDone()}
            disabled={isSubmitting}
          >
            Cancelar Edição
          </button>
        )}
      </div>
    </form>
  );
};
