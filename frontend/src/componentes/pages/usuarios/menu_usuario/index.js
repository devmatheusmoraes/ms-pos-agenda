import BotaoMenu from "../../../botaomenu";

function MenuUsuario() {
  return (
    <div className="botao-container">
      <BotaoMenu
        to="/menuusuario/usuario"
        nome="Usuários"
        cor="#DA7297"
      />
    </div>
  );
}

export default MenuUsuario;
