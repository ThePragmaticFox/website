FROM node:17-alpine3.15

RUN mkdir -p /website
WORKDIR /website

COPY assets ./assets
COPY components ./components
COPY layouts ./layouts
COPY middleware ./middleware
COPY pages ./pages
COPY plugins ./plugins
COPY nuxt.config.ts .
COPY tsconfig.json .
COPY package.json .

RUN npm i && npm cache clean --force
RUN npm run build

RUN rm -rf assets
RUN rm -rf components
RUN rm -rf layouts
RUN rm -rf middleware
RUN rm -rf pages
RUN rm -rf plugins
RUN rm -rf nuxt.config.ts
RUN rm -rf tsconfig.json

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["npm", "run", "start"]