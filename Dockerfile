FROM node:17-alpine3.14

ENV WEBSITE_DIRPATH=/website
RUN mkdir -p ${WEBSITE_DIRPATH}
COPY .output/ ${WEBSITE_DIRPATH}/

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", "/website/server/index.mjs" ]
