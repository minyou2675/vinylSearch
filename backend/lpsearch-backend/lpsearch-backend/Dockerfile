FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 빌드된 jar 복사
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# 실행
ENTRYPOINT ["java","-jar","/app/app.jar"]
