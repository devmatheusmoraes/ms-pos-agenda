import { useState, useEffect } from "react";
import axios from "axios";
import "./listarusuarios.css";
import DeleteUser from "../../../funcoes_usuario/exclusao";
import ViewUser from "../../../funcoes_usuario/exibir";
import { Table } from "antd";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/getAll");

      const data = response.data;

      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const formattedData = usuarios.map((user) => ({
    id: user.id,
    login: user.login,
    senha: user.senha,
  }));

  const columns = [
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, usuario) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <ViewUser type="usuario" id={usuario.id} />
          <DeleteUser type="usuario" id={usuario.id} />
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

export default Usuarios;
