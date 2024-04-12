FROM mysql:8.0

ADD db/init.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=${ENV_SPRING_DATASOURCE_PASSWORD}
ENV MYSQL_DATABASE=${ENV_MYSQL_DATABASE_NAME}

CMD ["--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]