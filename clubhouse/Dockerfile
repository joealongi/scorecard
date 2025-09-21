#
# Build Stage
# This stage uses a full JDK and Gradle to build the application.
#
FROM gradle:9.1.0-jdk21-alpine AS build
# Set the working directory inside the container
WORKDIR /home/gradle/src

# Copy only the necessary build files first to leverage Docker's layer caching.
# This ensures that the build cache is not invalidated by every code change.
COPY --chown=gradle:gradle build.gradle settings.gradle gradlew /home/gradle/src/
COPY --chown=gradle:gradle gradle /home/gradle/src/gradle

# A separate layer for dependencies
RUN gradle dependencies --no-daemon --no-watch-fs

# Copy the source code and run the build
COPY --chown=gradle:gradle . /home/gradle/src
RUN gradle build --no-daemon --no-watch-fs

#
# Production Stage
# This stage uses a minimal JRE to run the application, keeping the final image small and secure.
#
FROM mcr.microsoft.com/openjdk/jdk:21-azurelinux AS runner

# Create a non-root user and group for better security.
RUN addgroup --system spring && adduser --system --ingroup spring spring

# Set the working directory for the application
WORKDIR /app

# Copy the built JAR from the build stage to the runner stage.
# Using a more specific file path prevents issues if multiple JARs are created.
COPY --from=build --chown=spring:spring /home/gradle/src/build/libs/pinpointscore-clubhouse.jar /app/app.jar

# Switch to the non-root user
USER spring:spring

# Expose the application port
EXPOSE 8080

# The ENTRYPOINT command to run the application.
# The 'exec' form is recommended as it allows for proper signal handling (e.g., stopping the container gracefully).
ENTRYPOINT ["java","-Dspring.profiles.active=production","-jar","/app/app.jar"]
