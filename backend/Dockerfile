FROM gradle:7 as build

WORKDIR /app
COPY build.gradle.kts settings.gradle.kts /app/
RUN gradle --no-daemon build -x bootJar -x test --continue

COPY . .
RUN gradle --no-daemon build

FROM eclipse-temurin:17-alpine
COPY --from=build /app/build/libs/pollarbear.jar ./pollarbear.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "pollarbear.jar"]
