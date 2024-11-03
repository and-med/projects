FROM node:12-alpine

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install

COPY public ./public
COPY routes ./routes
COPY store ./store
COPY server.js ./server.js

ENTRYPOINT ["npm", "start"]