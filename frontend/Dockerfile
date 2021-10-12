FROM node:alpine AS build

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build:prod

FROM nginx:alpine

EXPOSE 80
COPY --from=build /app/dist/pollarbear /data/dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
