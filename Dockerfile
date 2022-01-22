# stage 1 - build
FROM node:14 AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# stage 2 - lighter image without frontend build dependencies
FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=BUILD_IMAGE /usr/src/app/build ./build

COPY . .

CMD ["npm", "run", "server"]
