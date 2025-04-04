import { useState, useEffect } from "react";
import api from "../../../../api/axiosInstance";
import "./listarprocedimentos.css";
import DeleteUser from "../../../funcoes_usuario/exclusao";
import ViewUser from "../../../funcoes_usuario/exibir";
import { Table } from "antd";

const Procedimentos = () => {
  const [procedimentos, setProcedimentos] = useState([]);

  const getProcedimento = async () => {
    try {
      const response = await api.get(
        "/procedure/getAll"
      );

      const data = response.data;

      setProcedimentos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProcedimento();
  }, []);

  const formattedData = procedimentos.map((procedimento) => ({
    id: procedimento.id,
    procedimento: procedimento.nome,
  }));

  const columns = [
    {
      title: "Procedimento",
      dataIndex: "procedimento",
      key: "procedimento",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, procedimento) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <ViewUser type="procedimento" id={procedimento.id} />
          <DeleteUser type="procedimento" id={procedimento.id} />
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

export default Procedimentos;
