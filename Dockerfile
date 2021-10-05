FROM node:16-alpine AS builder

WORKDIR /usr/app

COPY package.json .

RUN yarn install --quiet

FROM builder

COPY . .

ENV NODE_ENV production
ENV NEXT_PUBLIC_ENV production

RUN  rm -rf ./pages/api

USER node

CMD yarn run start-docker
