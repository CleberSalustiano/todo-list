# TODO LIST

## Para acessar o sistema diretamente basta clicar no link abaixo:

[Acesse o Todo List aqui](https://todo-list-xi-black-66.vercel.app/)

> **Importante:** A aplicação está publicada gratuitamente, com o backend hospedado no [Render](https://render.com) e o frontend no [Vercel](https://vercel.com). Como o backend utiliza um plano gratuito, ele pode demorar um pouco para responder na primeira requisição após um longo período de inatividade.

## Ambiente de Desenvolvimento

### Sem Docker

Para rodar o backend e o frontend em ambiente de desenvolvimento **sem Docker**, acesse cada uma das pastas (`./backend` e `./frontend`) via terminal e execute:

```bash
npm run dev
```

Cada pasta contém um arquivo `local.env`, que pode ser duplicado e renomeado para `.env` para facilitar o desenvolvimento local:

```bash
cp local.env .env
```

---

### Com Docker

Para rodar o backend e o frontend utilizando Docker em ambiente de desenvolvimento, execute:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Ou, caso as imagens já tenham sido criadas anteriormente:

```bash
docker-compose -f docker-compose.dev.yml up
```

Esse comando irá montar os volumes locais e ativar o hot reload automaticamente (usando `ts-node-dev` no backend e `Vite` no frontend).

---

## Ambiente de Produção / Instância Buildada

Para rodar uma instância da aplicação (frontend e backend já buildados), utilizando Docker:

```bash
docker-compose up --build
```

Ou, caso as imagens já estejam prontas:

```bash
docker-compose up
```

---

## Estrutura do Projeto

```
.
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── ...
├── docker-compose.yml             # Produção
└── docker-compose.dev.yml         # Desenvolvimento
```

---

## Testes

O backend possui testes unitários utilizando `jest` e o frontend possui testes end-to-end (E2E) com `cypress`. Para rodar os testes, acesse a pasta desejada (`./backend` ou `./frontend`) e execute:

```
npm run test
```

Além disso:

* No backend (`./backend`), você pode usar o comando `npm run test:watch` para manter os testes rodando em modo contínuo durante o desenvolvimento. Ele reexecuta os testes automaticamente a cada modificação no código.
* No frontend (`./frontend`), o comando `npm run test:open` abre a interface gráfica do Cypress, permitindo acompanhar a execução dos testes em tempo real no navegador.

## Observações

* As portas padrão são `3333` para o backend e `3000` para o frontend.
* O backend utiliza **SQLite** por padrão (`file:/app/prisma/dev.db`).
* O frontend consome a API via `VITE_REACT_API_URL`, configurável no `.env`.
