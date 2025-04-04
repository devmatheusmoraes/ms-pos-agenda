import { useState, useEffect } from "react";
import axios from "axios";
import "./listarprofissionais.css";
import ViewUser from "../../../funcoes_usuario/exibir";
import DeleteUser from "../../../funcoes_usuario/exclusao";
import { Table } from "antd";

const Profissionais = () => {
  const [profissionais, setProfissionais] = useState([]);

  const getProfissionais = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/professional/getAll`);
      const data = response.data;
      setProfissionais(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfissionais();
  }, []);

  const formattedData = profissionais.map((profissional) => ({
    id: profissional.id,
    nomeCompleto: profissional.nomeCompleto,
    celular: profissional.celular,
    cidade: profissional.cidade,
    ocupacao: profissional.ocupacao,
  }));

  const columns = [
    {
      title: "Nome",
      dataIndex: "nomeCompleto",
      key: "nomeCompleto",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
      key: "cidade",
    },
    {
      title: "Ocupação",
      dataIndex: "ocupacao",
      key: "ocupacao",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, profissional) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <ViewUser type="profissional" id={profissional.id} />
          <DeleteUser type="profissional" id={profissional.id} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={formattedData}
        columns={columns}
        locale={{
          emptyText: "Nenhum Resultado",
        }}
      />
    </div>
  );
};

export default Profissionais;
