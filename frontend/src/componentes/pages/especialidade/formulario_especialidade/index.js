import "./formularioespecialidade.css";
import { useForm } from "react-hook-form";
import api from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function FormularioEspecialidade() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/especialidade/save", data);
      alert("Especialidade salva com sucesso!");
      navigate("/menuespecialidade/especialidade");
    } catch (error) {
      console.error("Error:", error);
      alert("Não foi possível salvar a especialidade.", error);
    }
  };

  return (
    <form className="especialidade-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h1>Cadastro de Especialidade</h1>

      <label>Especialidade</label>
      <input type="text" {...register("especialidade", { required: true })} />
      {errors.especialidade && <p className="error">Campo Obrigatório</p>}

      <label>Desativado</label>
      <input type="checkbox" {...register("desativado")} />

      <button className="button" type="submit">
        Enviar
      </button>
    </form>
  );
}
