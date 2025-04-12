import styles from "./formprocedimento.module.css";
import { useForm } from "react-hook-form";
import api from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function FormularioProcedimento() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Dados do formulário:", data);
    console.log(api.defaults.baseURL);
    try {
      await api.post("/procedure/save", data);
      alert("Procedimento salva com sucesso!");
      navigate("/procedimento");
    } catch (error) {
      console.error("Error:", error);
      alert("Não foi possível salvar o procedimento.", error);
    }
  };

  return (
    <form
      className={styles.formProcedimentoContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Cadastro de Procedimento</h1>

      <label>Procedimento</label>
      <input type="text" {...register("nome", { required: true })} />
      {errors.procedimento && <p className="error">Campo Obrigatório</p>}

      <label>Desativado</label>
      <input type="checkbox" {...register("desativado")} />

      <button className={styles.button} type="submit">
        Enviar
      </button>
    </form>
  );
}
