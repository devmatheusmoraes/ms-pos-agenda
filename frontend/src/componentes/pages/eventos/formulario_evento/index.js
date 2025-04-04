import styles from "./formevento.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectProcedimento from "../../selectprocedimento";
import { useState } from "react";

export default function FormularioEvento() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [procedimentoIds, setProcedimentoIds] = useState([]); // Armazena os IDs selecionados

    const onSubmit = async (data) => {
        // Validar seleção de procedimentos
        if (procedimentoIds.length === 0) {
            alert("Selecione pelo menos um procedimento.");
            return;
        }

        // Transformar os dados para o formato esperado pelo backend
        const payload = {
            id: 0, // Backend espera um valor padrão para "id"
            nome: data.nome,
            duracaoEmMinuto: Number(data.duracaoEmMinuto),
            desativado: Boolean(data.desativado),
            idProdecedimento: procedimentoIds, // Corrigir o nome para o esperado pelo backend
        };

        console.log("Payload enviado:", payload); // Log para depuração

        try {
            await axios.post("http://localhost:8080/event/save", payload);
            alert("Evento salvo com sucesso!");
            navigate("/evento");
        } catch (error) {
            console.error("Erro ao salvar o evento:", error.response ? error.response.data : error.message);
            alert("Erro ao salvar o evento. Verifique os dados e tente novamente.");
        }
    };

    return (
        <form className={styles.formEventoContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1>Cadastro de Evento</h1>

            <label>Evento</label>
            <input
                type="text"
                {...register("nome", { required: "O nome é obrigatório." })}
                placeholder="Nome do evento"
            />
            {errors.nome && <p className="error">{errors.nome.message}</p>}

            <label>Duração (em minutos)</label>
            <input
                type="number"
                {...register("duracaoEmMinuto", { required: "A duração é obrigatória." })}
                placeholder="Ex.: 30"
            />
            {errors.duracaoEmMinuto && <p className="error">{errors.duracaoEmMinuto.message}</p>}

            <label>Procedimento</label>
            <SelectProcedimento
                control={control}
                name="idProcedimento"
                setProcedimentoIds={setProcedimentoIds}
            />
            {procedimentoIds.length === 0 && <p className="error">Selecione pelo menos um procedimento.</p>}

            <label>Desativado</label>
            <input type="checkbox" {...register("desativado")} />

            <button className={styles.button} type="submit">
                Enviar
            </button>
        </form>
    );
}
