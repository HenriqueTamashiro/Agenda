# Projeto Agenda

Aplicação web para cadastro e gerenciamento de contatos, com autenticação de usuários.

## Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- EJS
- Sessão com `express-session` + `connect-mongo`
- Segurança com `helmet` e `csurf`
- Frontend com Webpack + Babel

## Funcionalidades

- Cadastro de usuário
- Login e logout
- CRUD de contatos (rotas protegidas)
- Validação de formulários no frontend (login/cadastro e contato)
- Mensagens rápidas com `connect-flash`

## Estrutura principal

```text
.
|-- server.js
|-- routes.js
|-- webpack.config.js
|-- frontend/
|   |-- main.js
|   |-- modules/
|   |   |-- Login.js
|   |   `-- Contato.js
|   `-- assets/css/style.css
`-- package.json
```

Observação: o código referencia uma pasta `src/` (controllers, middlewares e views) e uma pasta `public/` para os assets compilados. Essas pastas precisam existir no projeto para o servidor rodar normalmente.

## Pré-requisitos

- Node.js 18+
- npm
- Banco MongoDB acessível (local ou Atlas)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
DB_URL=sua_string_de_conexao_mongodb
```

Recomendação de segurança:

- Não versionar `.env`
- Não expor usuário/senha do banco em código ou documentação

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

Em um terminal, rode o servidor:

```bash
npm start
```

Em outro terminal, rode o bundler do frontend:

```bash
npm run dev
```

A aplicação sobe em:

```text
http://localhost:3000
```

## Scripts disponíveis

- `npm start`: inicia o servidor com `nodemon`
- `npm run dev`: roda o Webpack em modo watch

## Rotas principais

- `GET /` - página inicial
- `GET /login/index` - página de login/cadastro
- `POST /login/register` - cadastro de usuário
- `POST /login/login` - autenticação
- `GET /login/logout` - logout
- `GET /contato/index` - lista/página de contato (protegida)
- `GET /contato/index/:id` - edição de contato (protegida)
- `POST /contato/register` - cria contato (protegida)
- `POST /contato/edit/:id` - atualiza contato (protegida)
- `GET /contato/delete/:id` - remove contato (protegida)

## Melhorias recomendadas

- Adicionar testes automatizados
- Versionar um `.env.example`
- Remover dependências não utilizadas do `package.json`
- Corrigir possíveis segredos expostos no histórico/local
