import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./edicaoprofissional.css";
import InputMask from "react-input-mask";

function EdicaoProfissional() {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm();

    const [profissional, setProfissional] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/professional/getById/${id}`)
            .then((res) => {
                const data = res.data;
                setProfissional(data);
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        setValue(key, data[key]);
                    }
                }
            })
            .catch((error) =>
                console.error("Erro ao buscar dados do profissional:", error)
            );
    }, [id, setValue]);

    const onSubmit = (data) => {
        axios
            .put(`http://localhost:8080/professional/update/${id}`, data)
            .then((response) => {
                console.log("Profissional atualizado:", response.data);
                alert("Profissional atualizado com sucesso!");
                navigate("/profissionais");
            })
            .catch((err) => {
                console.error("Erro ao atualizar profissional:", err);
                alert("Erro ao atualizar profissional");
            });
    };

    return (
        <form className="form-container-profissional" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <h1>Atualização do Profissional</h1>
                </div>
                <label>Nome Completo</label>
                <input type="text" {...register("nomeCompleto")} />
                {errors.nomeCompleto && (
                    <p className="error">{errors.nomeCompleto.message}</p>
                )}

                <label>Nascimento</label>
                <input type="date" {...register("nascimento")} />
                {errors.nascimento && (
                    <p className="error">{errors.nascimento.message}</p>
                )}

                <label>CPF</label>
                <InputMask mask="999.999.999-99" {...register("cpf")}>
                    {(inputProps) => <input type="text" {...inputProps} />}
                </InputMask>
                {errors.cpf && <p className="error">{errors.cpf.message}</p>}
                <label>Desativado</label>
                <input type="checkbox" {...register("desativado")} />
                <label>Celular</label>
                <InputMask mask="(99)99999-9999" {...register("celular")}>
                    {(inputProps) => <input type="text" {...inputProps} />}
                </InputMask>
                {errors.celular && <p className="error">{errors.celular.message}</p>}
                <label>Telefone</label>
                <InputMask mask="9999-9999" {...register("telefone")}>
                    {(inputProps) => <input type="text" {...inputProps} />}
                </InputMask>
                {errors.telefone && <p className="error">{errors.telefone.message}</p>}
                <label>Nome Social</label>
                <input type="text" {...register("nomeSocial")} />
                {errors.nomeSocial && (
                    <p className="error">{errors.nomeSocial.message}</p>
                )}
                <label>Ocupação</label>
                <input type="text" {...register("ocupacao")} />
                {errors.ocupacao && (
                    <p className="error">{errors.ocupacao.message}</p>
                )}

            </div>
            <div className="endereco-container">
                <label>Cep</label>
                <InputMask mask="99999-999" {...register("cep")}>
                    {(inputProps) => <input type="text" {...inputProps} />}
                </InputMask>
                {errors.cep && <p className="error">{errors.cep.message}</p>}
                <label>Logradouro</label>
                <input type="text" {...register("logradouro")} />
                {errors.logradouro && <p className="error">Campo Obrigatório</p>}
                <label>Número</label>
                <input type="number" {...register("numero")} />
                {errors.numero && <p className="error">{errors.numero.message}</p>}
                <label>Complemento</label>
                <input type="text" {...register("complemento")} />
                <label>UF</label>
                <input type="text" {...register("uf")} />
                {errors.uf && <p className="error">{errors.uf.message}</p>}
                <label>Cidade</label>
                <input type="text" {...register("cidade")} />
                {errors.cidade && <p className="error">{errors.cidade.message}</p>}
                <label>Bairro</label>
                <input type="text" {...register("bairro")} />
                {errors.bairro && <p className="error">{errors.bairro.message}</p>}
                <label>País</label>
                <input type="text" {...register("pais")} />
                {errors.pais && <p className="error">{errors.pais.message}</p>}
                <button className="button" type="submit">
                    Atualizar
                </button>
            </div>
        </form>
    );
}

export default EdicaoProfissional;
