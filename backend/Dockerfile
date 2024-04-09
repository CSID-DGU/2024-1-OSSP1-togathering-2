FROM openjdk:11-jdk-slim

WORKDIR /app
# docker compose 파일의 위치를 기반으로 작동한다.
COPY . .

# RUN은 현재 파일 위치를 기반으로 작동한다.
RUN chmod +x ./gradlew
RUN ./gradlew clean build

ENV JAR_PATH=./build/libs
RUN mv ${JAR_PATH}/*.jar ./app.jar

ENTRYPOINT ["java","-jar","app.jar"]