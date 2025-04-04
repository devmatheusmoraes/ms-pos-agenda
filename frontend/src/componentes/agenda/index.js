import React, { useEffect, useState } from "react";
import { message, Modal, Select, Spin } from "antd";
import api from "../../api/axiosInstance";
import moment from "moment";
import GridAgenda from "../grid";

const Agendamento = () => {
    const [profissionais, setProfissionais] = useState([]);
    const [selectedProfissional, setSelectedProfissional] = useState(null);
    const [scheduleConfigurations, setScheduleConfigurations] = useState([]); // Configuração de horários
    const [reservations, setReservations] = useState([]); // Reservas já efetuadas
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);

    // Carrega os dados iniciais
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    profRes,
                    scheduleRes,
                    clientesRes,
                    reservationsRes
                ] = await Promise.all([
                    api.get("/professional/getAll"),
                    api.get("/scheduleConfiguration/getAll"),
                    api.get("/customer/getAll"),
                    api.get("/reservation/getAll")
                ]);

                setProfissionais(profRes.data);
                setScheduleConfigurations(scheduleRes.data);
                setClientes(clientesRes.data);
                setReservations(reservationsRes.data);
                if (profRes.data.length > 0) {
                    setSelectedProfissional(profRes.data[0]);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                message.error("Erro ao carregar os dados. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Configuração de dias e horários fixos
    const daysOfWeek = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
    ];
    const hours = [
        "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
        "09:00", "09:30", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    // Gera os próximos 7 dias (com data original e data formatada para exibição)
    const getDaysWithDate = (startDate) => {
        const start = moment(startDate).startOf("week");
        return daysOfWeek.map((day, index) => {
            const currentDate = start.clone().add(index, "days");
            return {
                day,
                rawDate: currentDate.format("YYYY-MM-DD"), // Data para operações/reservas
                dateDisplay: currentDate.format("DD/MM"),    // Data para exibição
                dayIndex: index + 1,
            };
        });
    };

    const daysWithDate = getDaysWithDate(moment());

    /**
     * Verifica se o horário está liberado para exibição:
     * 1. Verifica se há uma configuração (scheduleConfiguration) para o profissional neste dia.
     * 2. Verifica se o horário (hour) está dentro do intervalo configurado.
     * 3. Se o horário estiver reservado, ele ainda será exibido (para mostrar o nome do cliente)
     *    mas ficará desabilitado.
     */
    const isHorarioDentroDaConfiguracao = (dayIndex, hour, profissionalId) => {
        const configs = scheduleConfigurations.filter(
            (config) =>
                config.profissionalId === profissionalId &&
                config.diaSemana === dayIndex
        );
        if (configs.length === 0) return false;
        return configs.some((config) => {
            const inicio = moment(config.horaInicio, "HH:mm");
            const fim = moment(config.horaFim, "HH:mm");
            const currentHour = moment(hour, "HH:mm");
            return currentHour.isSameOrAfter(inicio) && currentHour.isBefore(fim);
        });
    };

    // Combina a verificação da configuração com a verificação de reserva
    const isHorarioDisponivel = (dayIndex, hour, profissionalId, rawDate) => {
        // Primeiro, verifica se o horário está dentro da configuração
        if (!isHorarioDentroDaConfiguracao(dayIndex, hour, profissionalId)) return false;
        // Verifica se o horário já foi reservado para a data
        const reserved = reservations.some(
            (res) => res.dataMarcada === `${rawDate} ${hour}`
        );
        return !reserved;
    };

    /**
     * Ao clicar em um horário, abre o modal para seleção do cliente,
     * armazenando a data (rawDate) e hora selecionadas.
     */
    const handleHorarioClick = (hour, rawDate, dayIndex) => {
        if (!selectedProfissional) {
            message.error("Por favor, selecione um profissional.");
            return;
        }
        setSelectedCliente({ date: rawDate, hour });
        setIsModalVisible(true);
    };

    const createReservation = async ({
                                         dataMarcada,
                                         observacao = "Marcado",
                                         clienteId,
                                         profissionalId,
                                         agendaConfiguracaoId,
                                         usuarioId,
                                     }) => {
        const payload = {
            id: 0,
            dataMarcada,
            observacao,
            clienteId,
            ProfissionalId: profissionalId,
            agendaConfiguracaoId,
            usuarioId,
        };

        try {
            const response = await api.post("/reservation/save", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Reserva criada com sucesso:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar reserva:", error);
            throw error;
        }
    };

    // Função para confirmar o agendamento após o cliente ser selecionado
    const handleConfirmAgendamento = async () => {
        if (!selectedCliente || !selectedCliente.id) {
            message.error("Selecione um cliente.");
            return;
        }

        const dataMarcada = `${selectedCliente.date} ${selectedCliente.hour}`;
        const payloadData = {
            dataMarcada,
            observacao: "Marcado",
            clienteId: selectedCliente.id,
            profissionalId: selectedProfissional.id,
            agendaConfiguracaoId: 1, // Ajuste conforme necessário
            usuarioId: 1,            // Ajuste conforme necessário
        };

        try {
            await createReservation(payloadData);
            message.success(`Agendamento realizado para ${selectedCliente.hour} com ${selectedProfissional.nomeCompleto}.`);
            // Atualiza as reservas para bloquear o horário recém-agendado
            setReservations([...reservations, { ...payloadData, nomeCliente: selectedCliente.nomeCompleto }]);
        } catch (error) {
            message.error("Não foi possível realizar o agendamento.");
            console.log(payloadData)
        }
        setIsModalVisible(false);
    };

    // Manipulador para selecionar o cliente (mantendo data/hora escolhidas)
    const handleSelectCliente = (value) => {
        const cliente = clientes.find((c) => c.id === value);
        if (cliente) {
            setSelectedCliente((prev) => ({
                ...cliente,
                date: prev?.date || moment().format("YYYY-MM-DD"),
                hour: prev?.hour || "09:00",
            }));
        }
    };

    if (loading) {
        return (
            <div align="center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div align="center">
            <GridAgenda
                profissionalSelecionado={selectedProfissional?.nomeSocial}
                profissionais={profissionais}
                selectedProfissional={selectedProfissional}
                handleSelectProfissional={(id) =>
                    setSelectedProfissional(profissionais.find((p) => p.id === id))
                }
                daysWithDate={daysWithDate}
                hours={hours}
                scheduleConfigurations={scheduleConfigurations}
                isHorarioDisponivel={(dayIndex, hour, profissionalId, rawDate) =>
                    isHorarioDisponivel(dayIndex, hour, profissionalId, rawDate)
                }
                handleAgendar={handleHorarioClick}
                reservations={reservations}
                clientes={clientes}
            />

            <Modal
                title="Selecione um Cliente"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleConfirmAgendamento}
                okText="Confirmar Agendamento"
                cancelText="Cancelar"
            >
                <Select
                    placeholder="Selecione um cliente"
                    style={{ width: "100%" }}
                    onChange={handleSelectCliente}
                    options={clientes.map((cliente) => ({
                        label: cliente.nomeCompleto,
                        value: cliente.id,
                    }))}
                />
            </Modal>
        </div>
    );
};

export default Agendamento;
