import React, { useState } from "react";
import "./signuppage.css";
import { Button, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import useAuth from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os Emails não conferem");
      return;
    }

    try {
      const res = await signup(email, senha);
      if (res) {
        setError(res);
        return;
      }
      alert("Usuário cadastrado com sucesso");
      navigate("/");
    } catch (err) {
      setError("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup">Cadastro</h1>
      <Input
        className="input-antd"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      />
      <Input
        className="input-antd"
        placeholder="Confirmar Email"
        value={emailConf}
        onChange={(e) => {
          setEmailConf(e.target.value);
          setError("");
        }}
        prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      />
      <Input
        className="input-antd"
        placeholder="Senha"
        type="password" 
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
          setError("");
        }}
      />
      {error && <div className="error-message">{error}</div>}
      <Button onClick={handleSignup}>Registrar</Button>
      <h6>
        Já tem uma conta? <Link to="/signin">Entrar</Link>
      </h6>
    </div>
  );
};

export default Signup;
