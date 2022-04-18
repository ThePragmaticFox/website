FROM node:17-alpine3.14

RUN mkdir -p /website
COPY .output/ /website/

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD [ "node", "/website/server/index.mjs" ]