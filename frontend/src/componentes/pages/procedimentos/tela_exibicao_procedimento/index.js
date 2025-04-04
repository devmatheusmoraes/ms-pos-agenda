import "./exibicao.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditUser from "../../../funcoes_usuario/edicao";
import api from "../../../../api/axiosInstance";

function ExibicaoProcedimento() {
  const { id } = useParams();

  const [exibicao, setExibicao] = useState([]);

  useEffect(() => {
    api
      .get(`/procedure/getById/${id}`)
      .then((response) => {
        setExibicao(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da procedimento:", error);
      });
  }, [id]);

  return (
    <div className="exibicao-formulario">
      <EditUser type="procedimento" id={id} />
      <li className="titulo">ID: {exibicao.id}</li>
      <li className="titulo">Procedimento: {exibicao.nome}</li>
    </div>
  );
}
export default ExibicaoProcedimento;
