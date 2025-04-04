import React from "react";
import "./signinpage.css";
import { Button, Input } from "antd";
import { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import useAuth from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (!email || !senha) {
      setError("Campos Obrigatórios");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError("Email ou senha inválidos");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="signin-container">
      <h1 className="signin">Login</h1>
      <Input
        className="input-antd"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      />
      <Input.Password
        className="input-antd"
        placeholder="Senha"
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
          setError("");
        }}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      {error && <div className="error-message">{error}</div>}
      <h6>
        Não tem uma conta? <Link to="/signup">Registre-se</Link>
      </h6>
      <Button onClick={handleLogin}>Entrar</Button>
    </div>
  );
};

export default Signin;
