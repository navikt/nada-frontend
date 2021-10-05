FROM node:16-alpine AS builder

WORKDIR /usr/app

COPY package.json .

ENV NODE_ENV production
ENV NEXT_PUBLIC_ENV production
ENV NEXT_PUBLIC_BACKEND https://nada.dev.intern.nav.no/api/

RUN yarn install --quiet

FROM builder

COPY . .

RUN  rm -rf ./pages/api

RUN yarn build

USER node

CMD yarn run start
