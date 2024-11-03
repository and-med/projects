FROM node:16-alpine AS build-img

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

COPY public ./public
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY typings-custom/ ./typings-custom/

ENTRYPOINT ["npm", "start"]