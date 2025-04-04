import React from "react";
import { EditOutlined, ScheduleOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const actions = [
    <EditOutlined key="edit" />,
    <ScheduleOutlined key='confAgenda'/>
];

const CardButton = ({ nome, ocupacao, avatarUrl, onClick }) => {
    return (
        <Card
            hoverable
            onClick={onClick}
            actions={actions}
            style={{ width: 300, margin: "8px" }}
        >
            <Card.Meta
                avatar={<Avatar src={avatarUrl} />}
                title={nome}
                description={ocupacao}
            />
        </Card>
    );
};

export default CardButton;
