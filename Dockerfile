FROM node:16-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

USER node

RUN yarn install --ignore-scripts

COPY --chown=node:node . .

RUN yarn install
RUN yarn build