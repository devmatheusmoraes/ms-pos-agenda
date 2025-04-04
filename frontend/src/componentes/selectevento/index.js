import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Controller } from "react-hook-form";

const SelectEvent = ({ control, name, setEventIds }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/event/getAll")
            .then((response) => {
                const data = response.data;
                const formattedOptions = data.map((item) => ({
                    value: item.id,
                    label: item.nome,
                }));
                setOptions(formattedOptions);
            })
            .catch((error) => {
                console.error("Erro ao buscar os Eventos:", error);
            });
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Select
                    {...field}
                    isMulti
                    options={options}
                    value={options.filter(option => (field.value || []).includes(option.value))}
                    onChange={(selected) => {
                        field.onChange(selected ? selected.map(option => option.value) : []);
                        if (setEventIds) {
                            setEventIds(selected ? selected.map(option => option.value) : []);
                        }
                    }}
                    placeholder="Selecione os Eventos"
                />
            )}
        />
    );
};

export default SelectEvent;
