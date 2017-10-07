FROM node:8.6.0-alpine

WORKDIR /code

RUN npm install

COPY package.json /code/package.json

RUN npm install && npm ls
RUN mv /code/node_modules /node_modules

COPY . /code

CMD ["npm", "start"]
