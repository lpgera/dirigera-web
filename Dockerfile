FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

CMD ["npm", "run", "server"]
