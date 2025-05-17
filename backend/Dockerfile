# Etapa 1: build
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia o restante do código-fonte
COPY ./src ./src

# Compila TypeScript
RUN npm run build

# Etapa 2: imagem final
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia arquivos necessários do estágio anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta correta da aplicação
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
