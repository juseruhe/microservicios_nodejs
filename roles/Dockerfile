FROM node:20-alpine

WORKDIR /app/roles

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3301
CMD ["npm", "start"]
