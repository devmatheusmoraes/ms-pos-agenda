import React from "react";
import { Link } from "react-router-dom";
import { SelectOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Tooltip } from "antd";

const ViewUser = ({ type, id }) => {
  const baseUrl =
    type === "cliente"
      ? "/cliente"
      : type === "usuario"
      ? "/usuario"
      : type === "profissional"
      ? "/profissional"
      : type === "procedimento"
      ? "/procedimento"
      : "/especialidade"; 

  return (
    <div className="exibiruser">
      <Tooltip title="Visualizar">
        <Link to={`${baseUrl}/${id}`}>
          <Button icon={<SelectOutlined />} />
        </Link>
      </Tooltip>
    </div>
  );
};

export default ViewUser;
