# Projeto de Gerenciamento de Clínicas

Este é um projeto de sistema de gerenciamento de pacientes para clínicas, desenvolvido utilizando o framework Spring Boot, com persistência de dados em um banco de dados H2 e JPA (Java Persistence API).

## Descrição

O sistema permite o registro, acompanhamento e de tratamentos de pacientes.

## Funcionalidades Principais

- Cadastro de prontuários de pacientes.
- Controle de agenda.
- Controle de gastos.
- Acompanhamento dos tratamentos dos pacientes.

## Tecnologias Utilizadas

- **Spring Boot**: Framework Java para desenvolvimento de aplicativos web.
- **H2 Database**: Banco de dados em memória para desenvolvimento e teste.
- **JPA (Java Persistence API)**: Especificação Java para mapeamento objeto-relacional.
- **Maven**: Gerenciador de dependências e construção de projetos.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **`src/main/java`**: Contém o código-fonte Java.
  - **`br.com.infnet.minddesk.controllers`**: Controladores REST para manipulação das informações.
  - **`br.com.infnet.minddesk.model`**: Classes de modelo que representam os médicos, prontuários, etc.
  - **`br.com.infnet.minddesk.repositories`**: Interfaces de repositório para acesso aos dados.
  - **`br.com.infnet.minddesk.services`**: Serviços para lógica de negócios.
- **`src/main/resources`**: Contém os arquivos de configuração.
  - **`application.properties`**: Configurações do Spring Boot e do banco de dados H2.
- **`src/test/java`**: Contém os testes unitários e de integração.

## Como Executar

1. Certifique-se de ter o Java e o Maven instalados em seu ambiente de desenvolvimento.
2. Clone o repositório do projeto para o seu computador.
3. Navegue até o diretório raiz do projeto.
4. Execute o comando `mvn spring-boot:run` para iniciar o aplicativo.
5. O aplicativo estará acessível em `http://localhost:8080`.

## Documentação

- Após executar o projeto, abra o link no navegador: http://localhost:8080/swagger-ui/index.html
- Acesso ao banco de dados: http://localhost:8080/h2-console

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).
