# 1단계: build
FROM node:18.20.0-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: nginx로 serve
FROM nginx:1.25.4-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 덮어쓰기 (선택사항)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
