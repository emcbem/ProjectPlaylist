FROM node:20-alpine as builder
WORKDIR /app
COPY package.json . 
RUN NODE_ENV=development npm i
COPY . .
ARG VITE_URL
ARG VITE_NO_CERT
ENV VITE_URL $VITE_URL

RUN npm run build

FROM nginx:1.27.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]