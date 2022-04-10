FROM node:17-alpine3.14

RUN mkdir -p /www
COPY ./.output/ /www/

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD [ "node", "/www/server/index.mjs" ]