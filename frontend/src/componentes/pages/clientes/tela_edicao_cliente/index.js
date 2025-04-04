import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./edicaocliente.css";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

function EdicaoCliente() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [cliente, setCliente] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/getById/${id}`)
      .then((res) => {
        const data = res.data;
        setCliente(data);
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            setValue(key, data[key]);
          }
        }
      })
      .catch((error) =>
        console.error("Erro ao buscar dados do cliente:", error)
      );
  }, [id, setValue]);

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:8080/cliente/update/${id}`, data)
      .then((response) => {
        console.log("Cliente atualizado:", response.data);
        alert("Cliente atualizado com sucesso!");
        navigate("/cliente");
      })
      .catch((err) => {
        console.error("Erro ao atualizar cliente:", err);
        alert("Erro ao atualizar cliente");
      });
  };

  return (
    <form className="formContainerCliente" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Atualizar Cliente</h1>
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

        <label>Nome Social</label>
        <input type="text" {...register("nomeSocial")} />

        <label>Carteira Convênio</label>
        <input type="text" {...register("carteiraConvenio")} />

        <label>Indicação</label>
        <input type="text" {...register("indicacao")} />

        <label>Observação</label>
        <input type="text" {...register("observacao")} />

        <label>Celular</label>
        <InputMask mask="(99)99999-9999" {...register("celular")}>
          {(inputProps) => <input type="text" {...inputProps} />}
        </InputMask>

        <label>Telefone</label>
        <InputMask mask="9999-9999" {...register("telefone")}>
          {(inputProps) => <input type="text" {...inputProps} />}
        </InputMask>
      </div>
      <div className="endereco-container">
        <label>Cep</label>
        <InputMask mask="99999-999" {...register("cep")}>
          {(inputProps) => <input type="text" {...inputProps} />}
        </InputMask>
        {errors.cep && <p className="error">{errors.cep.message}</p>}

        <label>Logradouro</label>
        <input type="text" {...register("logradouro")} />
        {errors.logradouro && (
          <p className="error">{errors.logradouro.message}</p>
        )}

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

export default EdicaoCliente;
