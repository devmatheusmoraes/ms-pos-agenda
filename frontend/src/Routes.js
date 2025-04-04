import React, {Fragment} from "react";
import {Routes, Route} from "react-router-dom";
import Sidebar from "./componentes/sidebar";

//Login
import Signin from "./componentes/pages/signin";
import Signup from "./componentes/pages/signup";
import Home from "./componentes/pages/home";
import useAuth from "./componentes/hooks";

// Cliente
import Clientes from "./componentes/pages/clientes/listar_clientes";
import FormularioCliente from "./componentes/pages/clientes/formulario_cliente";
import ExibicaoCliente from "./componentes/pages/clientes/tela_exibicao_cliente";
import EdicaoCliente from "./componentes/pages/clientes/tela_edicao_cliente";

//Usuarios
import Usuarios from "./componentes/pages/usuarios/listar_usuarios";
import FormularioUsuario from "./componentes/pages/usuarios/formulario_usuario";
import ExibicaoUsuario from "./componentes/pages/usuarios/tela_exibicao_usuario";
import EdicaoUsuario from "./componentes/pages/usuarios/tela_edicao_usuario";
//Profissionais
import Profissionais from "./componentes/pages/profissionais/listar_profissionais";
import FormularioProfissional from "./componentes/pages/profissionais/formulario_profissional";
import ExibicaoProfissional from "./componentes/pages/profissionais/tela_exibicao_profissional";
import EdicaoProfissional from "./componentes/pages/profissionais/tela_edicao_profissional";
//Especialidades
import Especialidades from "./componentes/pages/especialidade/listar_especialidades";
import FormularioEspecialidade from "./componentes/pages/especialidade/formulario_especialidade";
import ExibicaoEspecialidade from "./componentes/pages/especialidade/tela_exibicao_especialidade";
//Procedimentos
import Procedimentos from "./componentes/pages/procedimentos/listar_procedimentos";
import FormularioProcedimento from "./componentes/pages/procedimentos/formulario_procedimento";
import ExibicaoProcedimento from "./componentes/pages/procedimentos/tela_exibicao_procedimento";

//Eventos
import Eventos from "./componentes/pages/eventos/listar_eventos";
import FormularioEvento from "./componentes/pages/eventos/formulario_evento";

//Agenda
import Agendamento from "./componentes/agenda";
import ConfAgenda from "./componentes/confagenda";


{/*
const Private = ({Item}) => {
    const {signed} = useAuth();
    return signed > 0 ? <Item/> : <Signin/>;
};
*/}

function AppRoutes() {
    return (
        <Fragment>
            <Routes>
                {/*<Route path="/signin" element={<Signin />} />
                <Route path="*" element={<Signin />} />
                < Route path="/signup" element={<Signup />} />*/}

                <Route element={<Sidebar/>}>
                    {/*<Route path="/home" element={<Private Item={Home} />} /> */}
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cliente" element={<Clientes/>}/>
                    <Route path="/formulariocliente" element={<FormularioCliente/>}/>
                    <Route path="/cliente/:id" element={<ExibicaoCliente/>}/>
                    <Route path="/cliente/update/:id" element={<EdicaoCliente/>}/>
                    <Route path="/usuario" element={<Usuarios/>}/>
                    <Route path="/formulariousuario" element={<FormularioUsuario/>}/>
                    <Route path="/usuario/:id" element={<ExibicaoUsuario/>}/>
                    <Route path="/usuario/update/:id" element={<EdicaoUsuario/>}/>
                    <Route path="/profissionais" element={<Profissionais/>}/>
                    <Route path="/formularioprofissional" element={<FormularioProfissional/>}/>
                    <Route path="/profissional/:id" element={<ExibicaoProfissional/>}/>
                    <Route path="/profissional/update/:id" element={<EdicaoProfissional/>}/>
                    <Route path="/especialidade" element={<Especialidades/>}/>
                    <Route path="/evento" element={<Eventos/>}/>
                    <Route path="/formularioevento" element={<FormularioEvento/>}/>
                    <Route path="/confagenda" element={<ConfAgenda />}/>
                    <Route
                        path="/formularioespecialidade"
                        element={<FormularioEspecialidade/>}
                    />
                    <Route
                        path="/especialidade/:id"
                        element={<ExibicaoEspecialidade/>}
                    />
                    <Route path="/procedimento" element={<Procedimentos/>}/>
                    <Route
                        path="/formularioprocedimento"
                        element={<FormularioProcedimento/>}
                    />
                    <Route path="/procedimento/:id" element={<ExibicaoProcedimento/>}/>
                    <Route path="/agendamento" element={<Agendamento/>}/>
                </Route>
            </Routes>
        </Fragment>
    );
}

export default AppRoutes;
