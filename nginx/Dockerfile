FROM nginx
# vim 설치
RUN apt-get update && apt-get install -y vim

# 이거 카피 안됨. (다음에는 ec2에 직접 설치하자)
ADD ./conf.prod ./etc/nginx/conf.d