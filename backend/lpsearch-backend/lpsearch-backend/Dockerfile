FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 프로젝트 전체 복사
COPY . .

# jar 생성
RUN ./gradlew build --no-daemon

# jar만 복사
COPY build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
