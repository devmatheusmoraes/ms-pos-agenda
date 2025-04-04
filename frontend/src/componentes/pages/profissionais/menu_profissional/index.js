import BotaoMenu from "../../../botaomenu";

function MenuMedico() {
  return (
    <div className="botao-container">
      <BotaoMenu
        to="/menumedico/medico"
        nome="Médicos"
        cor="#DA7297"
      />
    </div>
  );
}

export default MenuMedico;
