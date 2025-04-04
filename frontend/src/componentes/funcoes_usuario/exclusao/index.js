import api from "../../../api/axiosInstance";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { Button } from "antd";
import { Tooltip } from "antd";

const DeleteUser = ({ type, id }) => {
  const baseUrl =
    type === "customer"
      ? "/customer"
      : type === "user"
      ? "/user"
      : type === "professional"
      ? "/professional"
      : type === "procedure"
      ? "/procedure"
      : "/especialidade";

  const confirmarExclusao = () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
      inputDelete();
    }
  };

  const inputDelete = async () => {
    try {
      const response = await api.delete(
        `${baseUrl}/deleteById/${id}`
      );
      console.log(`Excluído com sucesso!`, response);
      alert(`Excluído com sucesso!`);
      window.location.reload();
    } catch (error) {
      console.error(`Erro ao excluir`, error);
      alert(`Erro ao excluir`);
    }
  };

  return (
    <div className="deleteuser">
      <Tooltip title="Excluir">
        <Link to={`${baseUrl}/${id}`} onClick={confirmarExclusao}>
          <Button icon={<DeleteOutlined />} />
        </Link>
      </Tooltip>
    </div>
  );
};

export default DeleteUser;
