import BotaoMenu from "../../../botaomenu";

function MenuPaciente() {
  return (
    <div className="botao-container">
      <BotaoMenu
        to="/menupaciente/paciente"
        nome="Pacientes"
        cor="#DA7297"
      />
    </div>
  );
}

export default MenuPaciente;
