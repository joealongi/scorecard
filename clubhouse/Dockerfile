FROM mcr.microsoft.com/openjdk/jdk:21-azurelinux
ARG JAR_FILE=target/*.wjar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]