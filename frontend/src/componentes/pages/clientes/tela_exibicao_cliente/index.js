import "./exibicao.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditUser from "../../../funcoes_usuario/edicao";
import api from "../../../../api/axiosInstance";

function ExibicaoCliente() {
  const { id } = useParams();

  const [exibicao, setExibicao] = useState([]);

  useEffect(() => {
    api
      .get(`customer/getById/${id}`)
      .then((response) => {
        setExibicao(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do paciente:", error);
      });
  }, [id]);

  return (
    <div className="exibicao-formulario">
      <EditUser type="cliente" id={id} />
      <li className="titulo">ID: {exibicao.id}</li>
      <li className="titulo">Nome Completo: {exibicao.nomeCompleto}</li>
      <li className="titulo">Nascimento: {exibicao.nascimento}</li>
      <li className="titulo">CPF: {exibicao.cpf}</li>
      <li className="titulo">Desativado? {exibicao.desativado}</li>
      <li className="titulo">Nome Social: {exibicao.nomeSocial}</li>
      <li className="titulo">Carteira Convenio: {exibicao.carteiraConvenio}</li>
      <li className="titulo">Indicação? {exibicao.indicacao}</li>
      <li className="titulo">Observação: {exibicao.observacao}</li>
      <li className="titulo">Celular: {exibicao.celular}</li>
      <li className="titulo">Telefone: {exibicao.telefone}</li>
      <li className="titulo">Logradouro: {exibicao.logradouro}</li>
      <li className="titulo">Numero: {exibicao.numero}</li>
      <li className="titulo">Cep: {exibicao.cep}</li>
      <li className="titulo">Complemento: {exibicao.complemento}</li>
      <li className="titulo">UF: {exibicao.uf}</li>
      <li className="titulo">Cidade: {exibicao.cidade}</li>
      <li className="titulo">Bairro: {exibicao.bairro}</li>
      <li className="titulo">País: {exibicao.pais}</li>
    </div>
  );
}
export default ExibicaoCliente;
