FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=${ENV_SPRING_DATASOURCE_PASSWORD}
ENV MYSQL_DATABASE=${ENV_MYSQL_DATABASE_NAME}
ENV MYSQL_HOST=%

CMD ["--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]