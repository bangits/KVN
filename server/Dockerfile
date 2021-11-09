FROM node:14-alpine as build
WORKDIR /www
COPY package.json yarn.lock ./
RUN npm install
COPY . /www/

FROM node:14-alpine as release
RUN apk --no-cache add tini
USER root
ARG container_port=9095
ENV PORT=$container_port
ENV NODE_ENV=production
EXPOSE $PORT
WORKDIR /www
COPY --from=build --chown=root:root /www /www
CMD ["node", "index.js"]
