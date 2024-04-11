# 기본 이미지
FROM node:14 as build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY frontend/package.json frontend/package-lock.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 복사
COPY frontend/ ./

# 애플리케이션 빌드
RUN npm run build

# Nginx를 사용하여 빌드된 앱 서비스
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]