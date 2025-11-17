import { useState, useEffect } from "react";
import { useAddResposta } from "../../hooks/useAuditorias";
import "./RespostaChecklist.css";

const CLASSIFICACOES = [
  "ADVERTENCIA",
  "BAIXA_SIMPLES",
  "BAIXA_COMPLEXA",
  "BAIXA_SEVERA",
  "BAIXA_EXTREMA",
  "MEDIA_SIMPLES",
  "MEDIA_COMPLEXA",
  "MEDIA_SEVERA",
  "MEDIA_EXTREMA",
  "ALTA_SIMPLES",
  "ALTA_COMPLEXA",
  "ALTA_SEVERA",
  "ALTA_EXTREMA",
  "URGENTE_SIMPLES",
  "URGENTE_COMPLEXA",
  "URGENTE_SEVERA",
  "URGENTE_EXTREMA",
];

export const RespostaChecklist = ({
  auditoriaId,
  auditoria,
  itemChecklist,
  respostaExistente,
}) => {
  const [resultado, setResultado] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [classificacao, setClassificacao] = useState("");
  const [acaoCorretiva, setAcaoCorretiva] = useState("");
  const [prazoResolucao, setPrazoResolucao] = useState("");

  const [emailResponsavel, setEmailResponsavel] = useState("");

  const addRespostaMutation = useAddResposta();

  useEffect(() => {
    if (respostaExistente) {
      setResultado(respostaExistente.resultado);
      setObservacoes(respostaExistente.observacoes || "");

      if (respostaExistente.naoConformidade) {
        setClassificacao(respostaExistente.naoConformidade.classificacao);
        setAcaoCorretiva(respostaExistente.naoConformidade.acaoCorretiva || "");
        setPrazoResolucao(
          respostaExistente.naoConformidade.prazoResolucao || ""
        );
        setEmailResponsavel(
          respostaExistente.naoConformidade.emailResponsavel || ""
        );
      } else {
        setClassificacao(CLASSIFICACOES[0]);
        setAcaoCorretiva("");
        setPrazoResolucao("");
        setEmailResponsavel("");
      }
    } else {
      setResultado("");
      setObservacoes("");
      setClassificacao(CLASSIFICACOES[0]);
      setAcaoCorretiva("");
      setPrazoResolucao("");
      setEmailResponsavel("");
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
      naoConformidade: null,
    };

    if (resultado === "NAO") {
      if (
        !classificacao ||
        !acaoCorretiva ||
        !prazoResolucao ||
        !emailResponsavel
      ) {
        alert(
          "Para 'NAO', todos os campos da NC (incluindo email) são obrigatórios."
        );
        return;
      }

      respostaData.naoConformidade = {
        classificacao: classificacao,
        acaoCorretiva: acaoCorretiva,
        prazoResolucao: prazoResolucao,
        emailResponsavel: emailResponsavel,
      };
    }

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
          disabled={addRespostaMutation.isPending}
        >
          SIM
        </button>
        <button
          className={`btn-res ${resultado === "NAO" ? "active-nao" : ""}`}
          onClick={() => setResultado("NAO")}
          disabled={addRespostaMutation.isPending}
        >
          NAO
        </button>
        <button
          className={`btn-res ${resultado === "N/A" ? "active-na" : ""}`}
          onClick={() => setResultado("N/A")}
          disabled={addRespostaMutation.isPending}
        >
          N/A
        </button>
      </div>

      <textarea
        className="observacoes"
        placeholder="Observações (opcional)"
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
        disabled={addRespostaMutation.isPending}
      />

      {/* === FORMULÁRIO DE NC (CONDICIONAL) === */}
      {resultado === "NAO" && (
        <div className="nc-form-container">
          <h4>Detalhes da Não Conformidade (NC)</h4>

          <div className="nc-field">
            <label>Classificação:</label>
            <select
              value={classificacao}
              onChange={(e) => setClassificacao(e.target.value)}
              disabled={addRespostaMutation.isPending}
            >
              {CLASSIFICACOES.map((c) => (
                <option key={c} value={c}>
                  {c.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="nc-field">
            <label>Ação Corretiva Indicada:</label>
            <textarea
              placeholder="Descreva a ação corretiva necessária"
              value={acaoCorretiva}
              onChange={(e) => setAcaoCorretiva(e.target.value)}
              disabled={addRespostaMutation.isPending}
            />
          </div>

          <div className="nc-field">
            <label>Prazo para Resolução:</label>
            <input
              type="date"
              value={prazoResolucao}
              onChange={(e) => setPrazoResolucao(e.target.value)}
              disabled={addRespostaMutation.isPending}
            />
          </div>

          {/* ====================================================== */}
          {/* 6. NOVO CAMPO DE EMAIL ADICIONADO AO FORMULÁRIO       */}
          {/* ====================================================== */}
          <div className="nc-field">
            <label>Email do Responsável (para notificação):</label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={emailResponsavel}
              onChange={(e) => setEmailResponsavel(e.target.value)}
              disabled={addRespostaMutation.isPending}
            />
          </div>

          <div className="nc-field">
            <label>Responsável (Automático):</label>
            <input
              type="text"
              value={auditoria?.auditor || "Carregando..."}
              disabled
            />
          </div>
        </div>
      )}

      <button
        className="btn-salvar"
        onClick={handleSave}
        disabled={addRespostaMutation.isPending}
      >
        {addRespostaMutation.isPending ? "Salvando..." : "Salvar Resposta"}
      </button>
    </div>
  );
};
