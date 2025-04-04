import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Controller } from "react-hook-form";

const SelectProfissional = ({ control, name }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8080/professional/getAll")
            .then((response) => {
                const data = response.data;
                const formattedOptions = data.map((professional) => ({
                    value: professional.id,
                    label: professional.nomeCompleto,
                }));
                setOptions(formattedOptions);
            })
            .catch((error) => {
                console.error("Erro ao buscar os Profissionais:", error.message);
                alert("Não foi possível carregar os profissionais.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: "Selecione um profissional." }}
            render={({ field, fieldState }) => (
                <>
                    <Select
                        options={options}
                        isLoading={loading}
                        placeholder={loading ? "Carregando..." : "Selecione o Profissional"}
                        value={options.find((option) => option.value === field.value) || null}
                        onChange={(selectedOption) =>
                            field.onChange(selectedOption ? selectedOption.value : null)
                        }
                    />
                    {fieldState.error && (
                        <span style={{ color: "red" }}>{fieldState.error.message}</span>
                    )}
                </>
            )}
        />
    );
};

export default SelectProfissional;
