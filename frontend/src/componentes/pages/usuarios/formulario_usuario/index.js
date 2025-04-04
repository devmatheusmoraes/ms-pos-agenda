import styles from "./formusuario.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import SelectProfissional from "../../../selectprofissional";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

export default function FormularioUsuario() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();
  const [idProfissional, setIdProfissional] = useState(null); // Adicionando o estado


    const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post("http://localhost:8080/user/save", data);
      alert("Usuário salvo com sucesso!");
      navigate("/usuario");
    } catch (error) {
      console.error("Error:", error);
      alert("Não foi possível salvar o usuário: " + error.message);
    }
  };

  return (
      <form className={styles.formContainerUsuario}  onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro de Usuário</h1>

        <label>ID Profissional</label>
        <SelectProfissional
          control={control}
          name="idProfissional"
          setIdProfissional={setIdProfissional}
        />

        <label>Login</label>
        <input
          type="text"
          {...register("login", { required: true })}
        />
        {errors.login && <p className="error">Campo obrigatório</p>}

        <label>Senha</label>
        <input
          type="password"
          {...register("senha", { required: true })}
        />
        {errors.senha && <p className="error">Campo obrigatório</p>}

        <label>Desativado</label>
        <input
          type="number"
          {...register("desativado")}
        />

        <button className={styles.button} type="submit">
          Enviar
        </button>
      </form>
  );
}
