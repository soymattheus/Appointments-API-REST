# 📘 Appointments API REST

API REST para gerenciamento de compromissos, desenvolvida com Node.js, MySQL e Docker.

Este documento descreve como executar o projeto em dois modos:

- 🧪 **Ambiente de Teste** → API + Banco rodando totalmente via Docker
- 🧑‍💻 **Ambiente de Desenvolvimento** → Banco no Docker + API rodando localmente

---

# 🧪 Ambiente de Teste — Tudo via Docker

Neste modo, **todos os serviços** (API, banco de dados e dependências) rodam dentro de containers Docker.

## 🚀 Pré-requisitos

- Docker
- Docker Compose

---

## ⚙️ Configuração de variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=9890

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d

NODE_ENV=test
DB_DIALECT=mysql
DB_HOST=service-mysql
DB_PORT=3306
DB_NAME=appointment-test
DB_USER=docker
DB_PASSWORD=docker
```

---

## ▶️ Subir o ambiente

No diretório raiz do projeto:

```bash
docker compose down -v
docker compose up --build
```

ou

```bash
docker-compose up -d --build
```

---

## 📊 Verificar status dos containers

```bash
docker compose ps
```

Todos os serviços devem aparecer com status **Up**.

---

## 📜 Ver logs

```bash
docker compose logs -f
```

---

## 🌐 Acessos

- API: `http://localhost:PORTA`
- Banco de dados: "service-mysql" - conforme definido no `docker-compose.yml`

---

# 🧑‍💻 Ambiente de Desenvolvimento — Banco no Docker + API Local

Neste modo, apenas o **banco de dados** roda no Docker e a **API roda localmente** na máquina.

---

## ⚙️ Configuração de variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=9890

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d

NODE_ENV=development
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=appointment-dev
DB_USER=docker
DB_PASSWORD=docker
```

Ajuste os valores conforme o projeto.

---

## 🐳 Subir somente o banco

```bash
docker compose down -v
docker compose up service-mysql
```

ou

```bash
docker compose up -d service-mysql
```

---

## 📦 Instalar dependências

```bash
npm install
```

ou

```bash
yarn
```

---

## 📦 Executar migrations

```bash
yarn run migration
```

---

## ▶️ Rodar API local

```bash
npm run dev
```

ou

```bash
npm start
```

A API será iniciada localmente e conectará ao banco que está rodando no Docker.

---

# 🧪 Testar a API

Acesse no navegador ou via cliente REST:

```
http://localhost:9890
```

Teste com ferramentas como:

- Postman
- Insomnia
- curl

Exemplo:

```bash
curl http://localhost:9890/rota
```

---

# 🧱 Comandos úteis

## ⛔ Parar ambiente Docker

```bash
docker compose down -v
```

---

## 🔄 Reiniciar containers

```bash
docker compose restart
```

---

## 🗂 Acessar terminal de um container

```bash
docker exec -it nome_container bash
```

---

## 🧠 Dicas

- Verifique se o `.env` está compatível com o `docker-compose.yml`
- Em caso de erro de conexão com banco:

```bash
docker logs service_mysql
```

- Para verificar se o banco está ativo:

```bash
docker exec -it service_mysql mysqladmin ping -u root -p
```

Deve retornar:

```
mysqld is alive
```

---

# 📎 Estrutura de ambientes

| Ambiente        | Banco  | API    |
| --------------- | ------ | ------ |
| Teste           | Docker | Docker |
| Desenvolvimento | Docker | Local  |

---

# ✅ Padrão recomendado

- 🧪 **Teste/QA** → 100% Docker
- 🧑‍💻 **Desenvolvimento** → Banco Docker + API local
- 🚀 **Produção** → Docker + CI/CD

---
