import { useState, useEffect } from "react";
import api from "../../../../api/axiosInstance";
import "./listarclientes.css";
import { Table } from "antd";
import ViewUser from "../../../funcoes_usuario/exibir";
import DeleteUser from "../../../funcoes_usuario/exclusao";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    try {
      const response = await api.get(`/customer/getAll`);
      const data = response.data;
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const formattedData = clientes.map((cliente) => ({
    id: cliente.id,
    nomeCompleto: cliente.nomeCompleto,
    celular: cliente.celular,
    cidade: cliente.cidade,
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
      title: "Ações",
      key: "acoes",
      render: (_, cliente) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <ViewUser type="customer" id={cliente.id} />
          <DeleteUser type="customer" id={cliente.id} />
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

export default Clientes;
