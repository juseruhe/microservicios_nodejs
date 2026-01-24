FROM node:20-alpine

WORKDIR /app/permissions

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3302
CMD ["npm", "start"]
