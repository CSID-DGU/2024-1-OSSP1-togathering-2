FROM nginx
# vim 설치
RUN apt-get update && apt-get install -y vim

COPY ./conf.d/nginx.conf ./etc/nginx/conf.d/default.conf