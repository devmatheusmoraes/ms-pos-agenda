import { useState, useEffect } from "react";
import api from "../../../../api/axiosInstance";
import "./listarespecialidades.css";
import DeleteUser from "../../../funcoes_usuario/exclusao";
import ViewUser from "../../../funcoes_usuario/exibir";
import { Table } from "antd";

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);

  const getEspecialidade = async () => {
    try {
      const response = await api.get(
        "/especialidade/getAll"
      );

      const data = response.data;

      setEspecialidades(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEspecialidade();
  }, []);

  const formattedData = especialidades.map((especialidade) => ({
    id: especialidade.id,
    especialidade: especialidade.especialidade,
  }));

  const columns = [
    {
      title: "Especialidade",
      dataIndex: "especialidade",
      key: "especialidade",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, especialidade) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <ViewUser type="especialidade" id={especialidade.id} />
          <DeleteUser type="especialidade" id={especialidade.id} />
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

export default Especialidades;
