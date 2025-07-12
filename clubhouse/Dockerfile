#!/bin/bash
FROM gradle:8.14.3-jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon
FROM mcr.microsoft.com/openjdk/jdk:21-azurelinux
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/pinpointscore-clubhouse.jar
EXPOSE 8080
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/app/pinpointscore-clubhouse.jar"]