# stage 1 - backend build
FROM --platform=$BUILDPLATFORM node:19 AS BACKEND_BUILD

WORKDIR /usr/src/app

COPY package*.json ./
COPY backend/package.json backend/

RUN npm ci --no-audit --no-fund -w backend

COPY backend backend

RUN npm run build -w backend

# stage 2 - frontend build
FROM --platform=$BUILDPLATFORM node:19 AS FRONTEND_BUILD

WORKDIR /usr/src/app

COPY package*.json ./
COPY frontend/package.json frontend/

RUN npm ci --no-audit --no-fund -w frontend

COPY frontend frontend

RUN npm run build -w frontend

# stage 3 - lighter image without frontend build dependencies
FROM node:19-alpine as TARGET

WORKDIR /usr/src/app

COPY package*.json ./
COPY backend/package.json backend/

RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund -w backend && npm cache clear --force

COPY . .

COPY --from=BACKEND_BUILD /usr/src/app/backend/dist ./backend/dist
COPY --from=FRONTEND_BUILD /usr/src/app/frontend/build ./frontend/build

CMD ["npm", "run", "start"]
