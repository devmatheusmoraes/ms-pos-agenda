-- Endereço
INSERT INTO ENDERECO(logradouro, numero, cep, uf, cidade, bairro, pais, complemento)
VALUES('Rua Euclides Ro', '123', '21765-200','RJ', 'Rio de Janeiro', 'Realengo', 'Brasil', 'Teste');

INSERT INTO ENDERECO(logradouro, numero, cep, uf, cidade, bairro, pais, complemento)
VALUES('Rua Limites', '123', '21765-203','RJ', 'Rio de Janeiro', 'Realengo', 'Brasil', 'Teste');

INSERT INTO ENDERECO(logradouro, numero, cep, uf, cidade, bairro, pais, complemento)
VALUES('Rua Jundiaí', '123', '28900-203','SP', 'Jundiaí', 'Down', 'Brasil', 'Teste');


-- Cliente
INSERT INTO CLIENTE(id, nome_completo, nascimento, cpf, desativado, nome_social, endereco_id, indicacao, celular, telefone)
VALUES(1, 'Diogo Roumillac', '1990-01-01', '111.111.111-11', false, 'Adayana', 1,'Insta', '(21)99999-9999', '2222-2222');

INSERT INTO CLIENTE(id, nome_completo, nascimento, cpf, desativado, nome_social, endereco_id, indicacao, celular, telefone)
VALUES(2, 'Flavia Viana', '1990-01-01', '222.111.222-11', false, 'Flavia', 2, 'X','(21)99999-9999', '2222-2222');


-- Profissional
INSERT INTO PROFISSIONAL(id, nome_completo, nascimento, cpf, desativado, nome_social, endereco_id, celular, telefone, ocupacao)
VALUES(3,'Everton Santos', '1990-01-01','333.333.333-33', false, 'Pernambucana', 2, '(21)99999-9999','1111-1111',0);

INSERT INTO PROFISSIONAL(id, nome_completo, nascimento, cpf, desativado, nome_social, endereco_id, celular, telefone, ocupacao)
VALUES(4,'Flavia', '1990-01-01','111.111.111-11', false, 'Gbl', 3, '(21)99999-9999','1111-1111',1);

INSERT INTO PROFISSIONAL(id, nome_completo, nascimento, cpf, desativado, nome_social, endereco_id, celular, telefone, ocupacao)
VALUES(5,'Joana', '1990-01-01','222.222.222-22', false, 'Roumillac', 1, '(21)99999-9999','1111-1111',0);


-- Procedimento
INSERT INTO PROCEDIMENTO(desativado, nome)
VALUES(false, 'Corte a Máquina');

INSERT INTO PROCEDIMENTO(desativado, nome)
VALUES(false, 'Corte a Tesoura');

INSERT INTO PROCEDIMENTO(desativado, nome)
VALUES(false, 'Navalha');

INSERT INTO PROCEDIMENTO(desativado, nome)
VALUES(false, 'Reflexo');

INSERT INTO PROCEDIMENTO(desativado, nome)
VALUES(false, 'Pacote Natal - Corte + Reflexo');


-- Evento
INSERT INTO EVENTO(desativado, duracao, nome)
VALUES(false, 30, 'Corte a Máquina');

INSERT INTO EVENTO(desativado, duracao, nome)
VALUES(false, 40, 'Corte a Tesoura');

INSERT INTO EVENTO(desativado, duracao, nome)
VALUES(false, 15, 'Navalha');

INSERT INTO EVENTO(desativado, duracao, nome)
VALUES(false, 60, 'Reflexo');

INSERT INTO EVENTO(desativado, duracao, nome)
VALUES(false, 90, 'Pacote Natal Máquina');

INSERT INTO EVENTO_PROCEDIMENTO(evento_id, procedimento_id)
VALUES(1,1);

INSERT INTO EVENTO_PROCEDIMENTO(evento_id, procedimento_id)
VALUES(2,2);

INSERT INTO EVENTO_PROCEDIMENTO(evento_id, procedimento_id)
VALUES(3,3);

INSERT INTO EVENTO_PROCEDIMENTO(evento_id, procedimento_id)
VALUES(4,4);

INSERT INTO EVENTO_PROCEDIMENTO(evento_id, procedimento_id)
VALUES(5,4);

INSERT INTO EVENTO_PROCEDIMENTO(evento_id, procedimento_id)
VALUES(5,1);


-- Configuração de Agenda
INSERT INTO AGENDA_CONFIGURACAO(data_inicio, dia_semana, hora_inicio, hora_fim, profissional_id)
VALUES('2024-01-01', 2, '09:00', '12:00', 3);

INSERT INTO AGENDA_CONFIGURACAO(data_inicio, dia_semana, hora_inicio, hora_fim, profissional_id)
VALUES('2024-01-01', 3, '06:30', '12:00', 3);

INSERT INTO AGENDA_CONFIGURACAO(data_inicio, dia_semana, hora_inicio, hora_fim, profissional_id)
VALUES('2024-01-01', 3, '13:00', '18:00', 3);

INSERT INTO AGENDA_CONFIGURACAO(data_inicio, dia_semana, hora_inicio, hora_fim, profissional_id)
VALUES('2024-01-01', 4, '13:00', '18:00', 3);


-- Nas segundas o profissional atende somente na parte da manhã os cortes normais sem pacote
INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (1,1);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (1,2);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (1,3);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (1,4);


-- Nas terças o profissional atende o dia inteiro, todos os procedimentos
INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (2,1);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (2,2);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (2,3);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (2,4);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (2,5);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (3,1);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (3,2);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (3,3);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (3,4);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (3,5);


-- Nas quartas o profissional atende somente na parte da tarde, somente máquina e tesoura
INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (4,1);

INSERT INTO EVENTO_AGENDA_CONFIGURACAO(agenda_configuracao_id, evento_id)
VALUES (4,2);