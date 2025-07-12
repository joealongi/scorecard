#!/bin/bash
FROM gradle:8.14.3-jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon --parallel --continue
FROM mcr.microsoft.com/openjdk/jdk:21-azurelinux
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/pinpointscore-clubhouse.jar
ENV APPLICATION_NAME=clubhouse
ENV SPRING_PROFILES_ACTIVE=production
ENV SPRING_PROFILES_DEFAULT=production
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update
ENV SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.microsoft.sqlserver.jdbc.SQLServerDriver
ENV SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.SQLServerDialect
ENV LOGGING_LEVEL_ORG_HIBERNATE_SQL=DEBUG
ENV SERVER_PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/app/pinpointscore-clubhouse.jar"]