import { useState, useEffect } from "react";
import { useAddResposta } from "../../hooks/useAuditorias";
import "./RespostaChecklist.css";

export const RespostaChecklist = ({
  auditoriaId,
  itemChecklist,
  respostaExistente,
}) => {
  const [resultado, setResultado] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const addRespostaMutation = useAddResposta();

  useEffect(() => {
    if (respostaExistente) {
      setResultado(respostaExistente.resultado);
      setObservacoes(respostaExistente.observacoes || "");
    } else {
      setResultado("");
      setObservacoes("");
    }
  }, [itemChecklist, respostaExistente]);

  const handleSave = () => {
    if (!resultado) {
      alert("Por favor, selecione um resultado (SIM, NAO, ou N/A).");
      return;
    }

    const respostaData = {
      itemChecklist: { id: itemChecklist.id },
      resultado: resultado,
      observacoes: observacoes,
    };

    addRespostaMutation.mutate({
      auditoriaId,
      respostaData,
    });
  };

  return (
    <div
      className={`resposta-container ${
        addRespostaMutation.isPending ? "saving" : ""
      }`}
    >
      <div className="resposta-header">
        <span className="categoria">{itemChecklist.categoria}</span>
        <strong className="numero">Item {itemChecklist.numero}</strong>
      </div>

      <p className="descricao">{itemChecklist.descricao}</p>

      <div className="botoes-resultado">
        <button
          className={`btn-res ${resultado === "SIM" ? "active-sim" : ""}`}
          onClick={() => setResultado("SIM")}
        >
          SIM
        </button>
        <button
          className={`btn-res ${resultado === "NAO" ? "active-nao" : ""}`}
          onClick={() => setResultado("NAO")}
        >
          NAO
        </button>
        <button
          className={`btn-res ${resultado === "N/A" ? "active-na" : ""}`}
          onClick={() => setResultado("N/A")}
        >
          N/A
        </button>
      </div>

      <textarea
        className="observacoes"
        placeholder="Observações (obrigatório se for 'NAO')"
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
      />

      <button
        className="btn-salvar"
        onClick={handleSave}
        disabled={addRespostaMutation.isPending}
      >
        {addRespostaMutation.isPending ? "Salvando..." : "Salvar Resposta"}
      </button>

      {resultado === "NAO" && (
        <div className="aviso-nc">
          Esta resposta irá gerar uma <strong>Não Conformidade (NC)</strong>.
        </div>
      )}
    </div>
  );
};
