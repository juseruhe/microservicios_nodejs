FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

WORKDIR /app/roles
EXPOSE 3001
CMD ["node", "server.js"]

