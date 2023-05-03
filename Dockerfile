FROM node:19.9.0-alpine3.17

ENV HOST=0.0.0.0
ENV PORT=4173

WORKDIR /app

COPY . /app

RUN npm install \
    && npm install -D @sveltejs/adapter-node \
    && npm run build 

ENTRYPOINT ["npm", "run", "start"]
