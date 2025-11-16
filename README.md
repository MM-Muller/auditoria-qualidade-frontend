# Sistema de Auditoria de Qualidade

Este é um projeto full-stack que implementa um sistema de auditoria de qualidade. A aplicação permite que usuários criem auditorias, respondam a um checklist dinâmico e gerenciem as "Não Conformidades" (NCs) que são geradas automaticamente a partir das respostas.

O sistema é dividido em dois componentes:

- **Backend (`auditoria-qualidade`):** Uma API RESTful construída com Spring Boot e Java 17, responsável por toda a lógica de negócios e persistência de dados.
- **Frontend (`auditoria-qualidade-frontend`):** Uma aplicação React (SPA) construída com Vite, que consome a API do backend e fornece uma interface de usuário interativa.

---

## ✨ Funcionalidades

- **Dashboard:** Visão geral com estatísticas principais, como NCs abertas, NCs atrasadas e total de auditorias.
- **Gestão de Auditorias:**
  - Criação de novas auditorias (por projeto e auditor).
  - Listagem de auditorias "Em Andamento" e "Finalizadas".
- **Execução de Auditoria:**
  - Responder a um checklist dinâmico com "SIM", "NAO" ou "N/A".
  - Cálculo automático do percentual de aderência ao finalizar a auditoria.
- **Gestão de Não Conformidades (NCs):**
  - Geração automática de NCs ao responder "NAO" no checklist.
  - Listagem de NCs abertas, atrasadas e resolvidas.
  - Fluxo de gerenciamento para **Resolver** ou **Escalonar** uma NC.
- **Admin de Checklist:**
  - Painel de administração para Criar, Ler, Atualizar e Desativar (CRUD) itens do checklist.

---

## 🚀 Tecnologias Utilizadas

### Backend (API)

- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA** (Hibernate)
- **MySQL** (Banco de Dados)
- **Maven**

### Frontend (Cliente)

- **React 19**
- **Vite** (Build Tool)
- **React Query** (Gerenciamento de estado de servidor)
- **Axios** (Requisições HTTP)
- **React Router DOM** (Roteamento)
- **React Hook Form** (Formulários)
- **React Toastify** (Notificações)

---

## 📋 Pré-requisitos

- JDK 17 ou superior
- Maven 3+
- Node.js 18+ (ou superior)
- Um servidor de banco de dados MySQL rodando

---

## ⚙️ Como Executar

### 1. Backend (API Spring Boot)

1.  **Configure o Banco de Dados:**

    - Abra o arquivo `src/main/resources/application.properties`.
    - Altere as propriedades `spring.datasource.username` e `spring.datasource.password` para corresponder à sua configuração local do MySQL.
    - O banco de dados `auditoria_db` será criado automaticamente.

2.  **Execute a aplicação:**

    ```bash
    # Na pasta raiz do backend (auditoria-qualidade)
    mvn spring-boot:run
    ```

3.  A API estará disponível em `http://localhost:8081`.

### 2. Frontend (Aplicação React)

1.  **Navegue até a pasta do frontend:**

    ```bash
    cd auditoria-qualidade-frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4.  A aplicação estará disponível em `http://localhost:5173` (ou a porta indicada no terminal).

---

## Endpoints da API

- `POST /api/auditorias` - Cria uma nova auditoria.
- `GET /api/auditorias` - Lista todas as auditorias.
- `GET /api/auditorias/{id}` - Busca uma auditoria específica.
- `POST /api/auditorias/{id}/respostas` - Adiciona uma resposta do checklist a uma auditoria.
- `PUT /api/auditorias/{id}/finalizar` - Finaliza uma auditoria e calcula os resultados.
- `GET /api/checklist` - Lista todos os itens de checklist ativos.
- `POST /api/checklist` - Cria um novo item de checklist.
- `PUT /api/checklist/{id}` - Atualiza um item de checklist.
- `DELETE /api/checklist/{id}` - Desativa um item de checklist.
- `GET /api/nao-conformidades` - Lista todas as NCs.
- `GET /api/nao-conformidades/abertas` - Lista NCs abertas ou escalonadas.
- `GET /api/nao-conformidades/atrasadas` - Lista NCs com prazo de resolução vencido.
- `PUT /api/nao-conformidades/{id}/resolver` - Marca uma NC como resolvida.
- `POST /api/nao-conformidades/{id}/escalonar` - Escalona uma NC para um superior.
