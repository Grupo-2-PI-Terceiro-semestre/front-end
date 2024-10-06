# Usar uma imagem base Node.js (alpine é uma versão mais leve)
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependência para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos da aplicação para o container
COPY . .

# Copiar a pasta .env para dentro do contêiner
COPY .env ./

# Rodar o build da aplicação
RUN npm run build

# Instalar o pacote serve para rodar o build
RUN npm install -g serve

# Expor a porta 4173, que é a porta padrão do Vite para preview de produção
EXPOSE 4173

# Comando para servir a aplicação usando o serve
CMD ["serve", "-s", "dist", "-l", "4173"]
