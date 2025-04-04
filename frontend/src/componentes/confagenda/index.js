import React from "react";
import { useForm, Controller } from "react-hook-form";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import SelectProfissional from "../selectprofissional";
import SelectEvent from "../selectevento";
import styles from "./formconfagenda.module.css";

const DAYS_OF_WEEK = [
    { value: "1", label: "Domingo" },
    { value: "2", label: "Segunda-feira" },
    { value: "3", label: "Terça-feira" },
    { value: "4", label: "Quarta-feira" },
    { value: "5", label: "Quinta-feira" },
    { value: "6", label: "Sexta-feira" },
    { value: "7", label: "Sábado" },
];

const ConfAgenda = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        defaultValues: {
            profissionalId: "",
            horaInicio: "",
            horaFim: "",
            dataInicio: "",
            diaSemana: "",
            eventoId: [],
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            if (!data.eventoId || data.eventoId.length === 0) {
                throw new Error("Selecione pelo menos um evento.");
            }

            const payload = transformFormData(data);
            await saveScheduleConfiguration(payload);

            navigate("/agendamento");
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <form className={styles.formConfAgendaContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1>Configuração de Agenda</h1>

            <FormFields
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
            />

            <button className={styles.button} type="submit">
                Enviar
            </button>
        </form>
    );
};

const FormFields = ({ register, errors, control, setValue }) => (
    <>
        <FormField label="Selecione o Profissional">
            <SelectProfissional control={control} name="profissionalId" />
        </FormField>

        <FormField label="Hora Início" error={errors.horaInicio?.message}>
            <input
                type="time"
                {...register("horaInicio", { required: "Hora de início é obrigatória" })}
            />
        </FormField>

        <FormField label="Hora Fim" error={errors.horaFim?.message}>
            <input
                type="time"
                {...register("horaFim", { required: "Hora de fim é obrigatória" })}
            />
        </FormField>

        <FormField label="Data Início" error={errors.dataInicio?.message}>
            <input
                type="date"
                {...register("dataInicio", { required: "Data de início é obrigatória" })}
            />
        </FormField>

        <FormField label="Dia da Semana" error={errors.diaSemana?.message}>
            <select
                {...register("diaSemana", { required: "Selecione um dia da semana" })}
            >
                <option value="">Selecione</option>
                {DAYS_OF_WEEK.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </FormField>

        <FormField label="Evento">
            <SelectEvent
                control={control}
                name="eventoId"
                setEventIds={(ids) => setValue("eventoId", ids)}
            />
        </FormField>
    </>
);

const FormField = ({ label, children, error }) => (
    <div className={styles.formField}>
        <label>{label}</label>
        {children}
        {error && <span className={styles.error}>{error}</span>}
    </div>
);

// Helper functions
const transformFormData = (data) => ({
    id: 0,
    horaInicio: data.horaInicio,
    horaFim: data.horaFim,
    dataInicio: data.dataInicio,
    diaSemana: parseInt(data.diaSemana, 10),
    eventoId: Array.isArray(data.eventoId)
        ? data.eventoId.map((id) => parseInt(id, 10))
        : [parseInt(data.eventoId, 10)],
    profissionalId: parseInt(data.profissionalId, 10),
});

const saveScheduleConfiguration = async (payload) => {
    try {
        await api.post("/scheduleConfiguration/save", payload);
        alert("Configuração de agenda salva com sucesso!");
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Não foi possível salvar a configuração de agenda."
        );
    }
};

const handleError = (error) => {
    console.error("Erro ao salvar:", error);
    alert(error.message);
};

export default ConfAgenda;