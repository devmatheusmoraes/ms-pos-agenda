import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../api/axiosInstance";
import { Controller } from "react-hook-form";

const SelectEspecialidade = ({ control, name, setEspecialidadeIds }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    api
      .get("/especialidade/getAll")
      .then((response) => {
        const data = response.data;
        const formattedOptions = data.map((item) => ({
          value: item.id,
          label: item.especialidade,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => {
        console.error("Erro ao buscar as especialidades:", error);
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
          value={options.filter(option => field.value.includes(option.value))}
          onChange={(selected) => {
            field.onChange(selected ? selected.map(option => option.value) : []);
            setEspecialidadeIds(selected ? selected.map(option => option.value) : []);
          }}
          placeholder="Selecione as especialidades"
        />
      )}
    />
  );
};

export default SelectEspecialidade;
