FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm test

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "run", "dev"]
