import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../../api/axiosInstance";
import { Controller } from "react-hook-form";

const SelectProcedimento = ({ control, name, setProcedimentoIds }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        api
            .get("/procedure/getAll")
            .then((response) => {
                const data = response.data;
                const formattedOptions = data.map((item) => ({
                    value: item.id,
                    label: item.nome,
                }));
                setOptions(formattedOptions);
            })
            .catch((error) => {
                console.error("Erro ao buscar os Procedimentos", error);
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
                    value={
                        Array.isArray(field.value) && field.value.length > 0
                            ? options.filter((option) => field.value.includes(option.value))
                            : []
                    }
                    onChange={(selected) => {
                        const selectedIds = selected ? selected.map((option) => option.value) : [];
                        field.onChange(selectedIds);
                        if (setProcedimentoIds) {
                            setProcedimentoIds(selectedIds);
                        }
                    }}
                    placeholder="Selecione o Procedimento"
                />
            )}
        />
    );
};

export default SelectProcedimento;
