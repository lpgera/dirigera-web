# stage 1 - build
FROM --platform=$BUILDPLATFORM node:23-alpine AS build

ARG COMMIT_SHA

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
FROM node:23-alpine AS target

WORKDIR /usr/src/app

COPY package*.json ./
COPY backend/package.json backend/

RUN npm ci --omit=dev --no-audit --no-fund -w backend && npm cache clear --force

COPY . .

COPY --from=BUILD /usr/src/app/backend/dist ./backend/dist
COPY --from=BUILD /usr/src/app/frontend/build ./frontend/build

CMD ["npm", "run", "start-without-env-file"]
