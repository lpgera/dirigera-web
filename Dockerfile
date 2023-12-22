# stage 1 - build
FROM --platform=$BUILDPLATFORM node:21 AS BUILD

ARG VERSION

WORKDIR /usr/src/app

COPY package*.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/

RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

COPY backend backend

RUN npm run test -w backend

RUN npm run build -w backend

COPY frontend frontend

RUN npm run build -w frontend

# stage 2 - target
FROM node:21-alpine as TARGET

WORKDIR /usr/src/app

COPY package*.json ./
COPY backend/package.json backend/

RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev --ignore-scripts --no-audit --no-fund -w backend

COPY . .

COPY --from=BUILD /usr/src/app/backend/dist ./backend/dist
COPY --from=BUILD /usr/src/app/frontend/build ./frontend/build

CMD ["npm", "run", "start"]
