import "./edicao.css";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Tooltip } from "antd";

const EditUser = ({ type, id }) => {
  const isValidType =
    type === "cliente" || type === "usuario" || type === "profissional";
  const baseUrl =
    type === "cliente"
      ? "/cliente"
      : type === "usuario"
      ? "/usuario"
      : "/profissional";

  return isValidType ? (
    <div className="botao-edicao">
      <Tooltip title="Editar">
        <Link to={`${baseUrl}/update/${id}`}>
          <Button className="edit-button" icon={<EditOutlined />} />
        </Link>
      </Tooltip>
    </div>
  ) : null;
};

export default EditUser;
