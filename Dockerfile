FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

WORKDIR /usr/src/app/src

CMD ["node","index"]