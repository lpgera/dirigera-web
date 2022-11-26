# stage 1 - build
FROM --platform=$BUILDPLATFORM node:19 AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

COPY . .

RUN npm run build:backend
RUN npm run build:frontend

# stage 2 - lighter image without frontend build dependencies
FROM node:19-alpine as TARGET

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund && npm cache clear --force

COPY . .

COPY --from=BUILD_IMAGE /usr/src/app/build ./build
COPY --from=BUILD_IMAGE /usr/src/app/server ./server

CMD ["node", "-r", "dotenv/config", "./server/index.js"]
