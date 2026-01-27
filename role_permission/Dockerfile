FROM node:20-alpine

WORKDIR /app/role_permission

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3303
CMD ["npm", "start"]
