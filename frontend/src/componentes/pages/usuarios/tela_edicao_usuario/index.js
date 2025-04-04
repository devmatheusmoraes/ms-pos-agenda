import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../../../api/axiosInstance";
import "./edicao.css";

function EdicaoUsuario() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    api
      .get(`/user/getById/${id}`)
      .then((res) => {
        const data = res.data;
        setUsuario(data);
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            setValue(key, data[key]);
          }
        }
      })
      .catch((error) =>
        console.error("Erro ao buscar dados do Usuário:", error)
      );
  }, [id, setValue]);

  const onSubmit = (data) => {
    api
      .put(`/usuario/update/${id}`, data)
      .then((response) => {
        console.log("Usuario atualizado:", response.data);
        alert("Usuário atualizado com sucesso!");
        window.history.back();
      })
      .catch((err) => {
        console.error("Erro ao atualizar usuário:", err);
        alert("Erro ao atualizar usuário");
      });
  };

  return (
    <section className="formulario">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="titulo">Atualizar Usuário</h1>
        <label className="label">Usuário</label>
        <input
          className="input"
          type="text"
          {...register("login", {
            required: "Campo Obrigatório",
          })}
        />
        {errors.usuario && <p className="error">{errors.usuario.message}</p>}
          
        <label className="label">Senha</label>
        <input
          className="input"
          type="text"
          {...register("senha", { required: "Campo obrigatório" })}
        />
        {errors.senha && <p className="error">{errors.senha.message}</p>}

        <label className="label">Desativado</label>
        <input className="input" type="number" {...register("desativado")} />
        <label className="label">Id Médico</label>
        <input className="input" type="number" {...register("IdMedico")} />

        <button type="submit" className="botao-enviar">
          Atualizar Usuário
        </button>
      </form>
    </section>
  );
}

export default EdicaoUsuario;
