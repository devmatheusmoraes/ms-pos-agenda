import BotaoMenu from "../../../botaomenu";

function MenuEspecialidade() {
  return (
    <div className="botao-container">
      <BotaoMenu
        to="/menuespecialidade/especialidade"
        nome="Especialidades"
        cor="#DA7297"
      />
    </div>
  );
}

export default MenuEspecialidade;
