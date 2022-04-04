FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

EXPOSE 3000

CMD ["node", "./dist/index.js"]
