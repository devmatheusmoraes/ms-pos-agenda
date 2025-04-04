import React from "react";
import { Button, Col, Row } from "antd";
import moment from "moment";
import styles from "./grid.module.css";
import CardButton from "../card_profissional";

const GridAgenda = ({
                        profissionais,
                        selectedProfissional,
                        handleSelectProfissional,
                        profissionalSelecionado,
                        daysWithDate,
                        hours,
                        scheduleConfigurations,
                        isHorarioDisponivel,
                        handleAgendar,
                        reservations,
                        clientes,
                    }) => {
    // Early return if no professional is selected
    if (!selectedProfissional) {
        return (
            <div className={styles.gridContainer}>
                <p className={styles.emptyState}>Selecione um profissional.</p>
            </div>
        );
    }

    // Move grid data calculation to a separate function for better organization
    const calculateGridData = () => {
        return daysWithDate.map(({ day, dayIndex, rawDate, dateDisplay }) => {
            const configs = scheduleConfigurations.filter(
                (config) =>
                    config.profissionalId === selectedProfissional.id &&
                    config.diaSemana === dayIndex
            );

            if (configs.length === 0) {
                return { day, dayIndex, rawDate, dateDisplay, hoursData: [] };
            }

            const hoursData = getValidHours(configs, hours).map((hour) => {
                const reservation = findReservation(reservations, rawDate, hour);
                const nomeCliente = getClienteName(reservation, clientes);
                const available = isHorarioDisponivel(
                    dayIndex,
                    hour,
                    selectedProfissional.id,
                    rawDate
                );

                return {
                    hour,
                    reserved: Boolean(reservation),
                    nomeCliente,
                    available,
                };
            });

            return {
                day,
                dayIndex,
                rawDate,
                dateDisplay,
                hoursData,
            };
        });
    };

    const gridData = calculateGridData();

    return (
        <div className={styles.mainContainer}>
            <ProfessionalsSection
                profissionais={profissionais}
                handleSelectProfissional={handleSelectProfissional}
            />

            <ScheduleGrid
                profissionalSelecionado={profissionalSelecionado}
                gridData={gridData}
                handleAgendar={handleAgendar}
            />
        </div>
    );
};

// Helper Components
const ProfessionalsSection = ({ profissionais, handleSelectProfissional }) => (
    <div className={styles.container}>
        {profissionais.map((profissional) => (
            <CardButton
                key={profissional.id}
                nome={profissional.nomeSocial}
                ocupacao={profissional.ocupacao}
                onClick={() => handleSelectProfissional(profissional.id)}
            />
        ))}
    </div>
);

const ScheduleGrid = ({ profissionalSelecionado, gridData, handleAgendar }) => (
    <div className={styles.gridContainer}>
        <h1>Profissional Selecionado: {profissionalSelecionado}</h1>

        <GridHeader gridData={gridData} />
        <GridBody gridData={gridData} handleAgendar={handleAgendar} />
    </div>
);

const GridHeader = ({ gridData }) => (
    <Row gutter={[16, 16]}>
        {gridData.map(({ day, dateDisplay }, index) => (
            <Col span={3} key={index} className={styles.gridHeader}>
                <strong>{`${day} (${dateDisplay})`}</strong>
            </Col>
        ))}
    </Row>
);

const GridBody = ({ gridData, handleAgendar }) => (
    <Row gutter={[16, 16]}>
        {gridData.map(({ dayIndex, rawDate, hoursData }, index) => (
            <Col span={3} key={index} className={styles.gridCell}>
                <TimeSlots
                    hoursData={hoursData}
                    handleAgendar={handleAgendar}
                    rawDate={rawDate}
                    dayIndex={dayIndex}
                />
            </Col>
        ))}
    </Row>
);

const TimeSlots = ({ hoursData, handleAgendar, rawDate, dayIndex }) => {
    if (hoursData.length === 0) {
        return <span className={styles.noSlots}>Sem horários disponíveis</span>;
    }

    return (
        <div className={styles.timeSlotsContainer}>
            {hoursData.map(({ hour, reserved, nomeCliente, available }, index) => (
                <Button
                    key={index}
                    onClick={() => available && !reserved && handleAgendar(hour, rawDate, dayIndex)}
                    className={styles.gridCellButton}
                    disabled={!available || reserved}
                    type={reserved ? "danger" : "default"}
                >
                    {reserved ? nomeCliente : hour}
                </Button>
            ))}
        </div>
    );
};

// Helper functions
const getValidHours = (configs, hours) => {
    return hours.filter((hour) => {
        return configs.some((config) => {
            const inicio = moment(config.horaInicio, "HH:mm");
            const fim = moment(config.horaFim, "HH:mm");
            const currentHour = moment(hour, "HH:mm");
            return currentHour.isSameOrAfter(inicio) && currentHour.isBefore(fim);
        });
    });
};

const findReservation = (reservations, rawDate, hour) => {
    return reservations.find((res) => res.dataMarcada === `${rawDate} ${hour}`);
};

const getClienteName = (reservation, clientes) => {
    if (!reservation) return "";
    return (
        reservation.nomeCliente ||
        clientes.find((c) => c.id === reservation.clienteId)?.nomeCompleto ||
        ""
    );
};

export default GridAgenda;
