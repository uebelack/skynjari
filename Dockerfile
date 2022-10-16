FROM node:16-alpine as build

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --ignore-scripts

COPY . .

RUN yarn install
RUN yarn build

FROM node:16-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

USER node

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --ignore-scripts --production

RUN rm -rf node_modules/typescript

COPY --from=build --chown=node:node /app/dist/apps /app

EXPOSE 3333

CMD ["node", "backend/main.js"]