FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY public ./public
COPY src ./src
COPY tsconfig.json .

ENTRYPOINT ["npm", "start"]