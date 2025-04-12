# Dockerfile
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# gradle wrapper 복사 + build.gradle 등 복사
COPY . .

# JAR 빌드
RUN chmod +x ./gradlew

RUN ./gradlew bootJar

# 빌드된 jar 복사
RUN cp build/libs/*.jar app.jar

# 실행
CMD ["java", "-jar", "app.jar"]
