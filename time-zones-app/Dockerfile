FROM node:16-alpine

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install

COPY config/ ./config/
COPY public/ ./public/
COPY scripts/ ./scripts/
COPY src/ ./src/

ENTRYPOINT ["npm", "start"]