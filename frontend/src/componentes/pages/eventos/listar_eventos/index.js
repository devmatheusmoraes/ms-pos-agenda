import { useState, useEffect } from "react";
import axios from "axios";
import "./listareventos.css";
import DeleteUser from "../../../funcoes_usuario/exclusao";
import ViewUser from "../../../funcoes_usuario/exibir";
import { Table } from "antd";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);

  const getEvento = async () => {
    try {
      const response = await axios.get("http://localhost:8080/event/getAll");
      const data = response.data;
      setEventos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvento();
  }, []);

  const formattedData = eventos.map((evento) => ({
    id: evento.id,
    evento: evento.nome,
    duracao: evento.duracaoEmMinuto
  }));

  const columns = [
    {
      title: "Evento",
      dataIndex: "evento",
      key: "id",
    },
    {
      title: "Duração",
      dataIndex: "duracao",
      render: (text) => `${text} minutos`,
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, evento) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <ViewUser type="evento" id={evento.id} />
          <DeleteUser type="evento" id={evento.id} />
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

export default Eventos;
