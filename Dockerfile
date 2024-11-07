# Build Angular project
FROM node:16-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Deploy using nginx
FROM nginx:1.17.1-alpine

COPY --from=builder /usr/src/app/dist/ite-fronted /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

