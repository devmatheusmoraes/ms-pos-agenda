import "./exibicao.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditUser from "../../../funcoes_usuario/edicao";
import api from "../../../../api/axiosInstance";

function ExibicaoEspecialidade() {
  const { id } = useParams();

  const [exibicao, setExibicao] = useState([]);

  useEffect(() => {
    api
      .get(`/especialidade/getById/${id}`)
      .then((response) => {
        setExibicao(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da especialidade:", error);
      });
  }, [id]);

  return (
    <div className="exibicao-formulario">
      <EditUser type="especialidade" id={id} />
      <li className="titulo">ID: {exibicao.id}</li>
      <li className="titulo">Especialidade: {exibicao.especialidade}</li>
    </div>
  );
}
export default ExibicaoEspecialidade;
