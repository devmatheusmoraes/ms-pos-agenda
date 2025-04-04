import "./exibicao.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditUser from "../../../funcoes_usuario/edicao";
import axios from "axios";

function ExibicaoUsuario() {
  const { id } = useParams();

  const [exibicao, setExibicao] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/usuario/getById/${id}`)
      .then((response) => {
        setExibicao(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do paciente:", error);
      });
  }, [id]);

  return (
    <div className="exibicao-formulario">
      <EditUser type="usuario" id={id} />
      <li className="titulo">Desativado: {exibicao.desativado}</li> 
      <li className="titulo">Usuário: {exibicao.login}</li>
      <li className="titulo">Senha: {exibicao.senha}</li>
      <li className="titulo">Id Médico: {exibicao.IdMedico}</li>
    </div>
  );
}
export default ExibicaoUsuario;
