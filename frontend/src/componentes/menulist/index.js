import React from "react";
import {Menu} from "antd";
import {
    UserOutlined,
    UnorderedListOutlined,
    BookOutlined,
    HomeOutlined,
    StarOutlined,
    CalendarOutlined
} from "@ant-design/icons";
import "./menu-bar.css";
import {Link} from "react-router-dom";

const MenuList = () => {
    return (
        <Menu className="menu-bar">
            <div className="items"></div>
            <Menu.Item
                key="home"
                Title="Home"
                icon={<HomeOutlined style={{fontSize: "20px"}}/>}
            >
                <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.SubMenu
                key="cliente"
                title="Cliente"
                icon={<UserOutlined style={{fontSize: "20px"}}/>}
            >
                <Menu.Item key="exibircliente">
                    <Link to="/cliente">Listar Clientes </Link>
                </Menu.Item>
                <Menu.Item key="cadastrarcliente">
                    <Link to="/formulariocliente">Cadastro</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="profissional"
                title="Profissional"
                icon={<UserOutlined style={{fontSize: "20px"}}/>}
            >
                <Menu.Item key="exibirprofissional">
                    <Link to="/profissionais">Listar Profissionais</Link>
                </Menu.Item>
                <Menu.Item key="cadastrarprofissional">
                    <Link to="/formularioprofissional">Cadastro</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="usuario"
                title="Usuário"
                icon={<UserOutlined style={{fontSize: "20px"}}/>}
            >
                <Menu.Item key="exibirusuario">
                    <Link to="/usuario">Listar Usuários</Link>
                </Menu.Item>
                <Menu.Item key="cadastrarusuario">
                    <Link to="/formulariousuario">Cadastro</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="procedimento"
                title="Procedimento"
                icon={<UnorderedListOutlined style={{fontSize: "20px"}}/>}
            >
                <Menu.Item key="exibirprocedimento">
                    <Link to="/procedimento">Listar Procedimentos</Link>
                </Menu.Item>
                <Menu.Item key="cadastrarprocedimento">
                    <Link to="/formularioprocedimento">Cadastro</Link>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
                key="evento"
                title="Evento"
                icon={<StarOutlined style={{fontSize: "20px"}}/>}
            >
                <Menu.Item key="exibirevento">
                    <Link to="/evento">Listar Eventos</Link>
                </Menu.Item>
                <Menu.Item key="cadastrarevento">
                    <Link to="/formularioevento">Cadastro</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
                key="agendamento"
                Title="Agendamento"
                icon={<CalendarOutlined style={{fontSize: "20px"}}/>}
            >
                <Link to="/agendamento">Agendamento</Link>
            </Menu.Item>
            <Menu.Item
                key="confAgenda"
                Title="confAgenda"
                icon={<CalendarOutlined style={{fontSize: "20px"}}/>}
            >
                <Link to="/confagenda">Configuração de Agenda</Link>
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;
