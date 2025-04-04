import BotaoMenu from "../../../botaomenu";

function MenuProcedimentos() {
  return (
    <div className="botao-container">
      <BotaoMenu
        to="/menuprocedimento/procedimento"
        nome="Procedimentos"
        cor="#DA7297"
      />
    </div>
  );
}

export default MenuProcedimentos;
