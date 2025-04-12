FROM eclipse-temurin:17-jdk-alpine

# 1. 작업 디렉토리 설정
WORKDIR /app

# 2. Gradle Wrapper와 소스코드 전체 복사
COPY . .

# 3. JAR 빌드
RUN ./gradlew bootJar --no-daemon

# 4. 빌드된 JAR 복사
# (bootJar 시 생성되는 기본 JAR 파일 이름을 자동으로 찾기 위해 wildcard 사용)
RUN cp build/libs/*.jar app.jar

# 5. JAR 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
