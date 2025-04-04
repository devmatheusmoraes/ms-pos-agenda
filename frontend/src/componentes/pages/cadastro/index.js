import BotaoMenu from "../../botaomenu";

function MenuCadastro() {
  return (
    <div className="botao-container">
      <BotaoMenu
        to="/menupaciente/formulariopaciente"
        nome="Cadastrar Paciente"
        cor="#DA7297"
      />

      <BotaoMenu
        to="/menuusuario/formulariousuario"
        nome="Cadastrar Usuário
        "
        cor="#DA7297"
      />

      <BotaoMenu
        to="/menumedico/formulariomedico"
        nome="Cadastrar Médico"
        cor="#DA7297"
      />

      <BotaoMenu
        to="/menuprocedimento/formularioprocedimento"
        nome="Cadastrar Procedimento"
        cor="#DA7297"
      />

      <BotaoMenu
        to="/menuespecialidade/formularioespecialidade"
        nome="Cadastrar Especialidade"
        cor="#DA7297"
      />
    </div>
  );
}

export default MenuCadastro;
