# Teebox
###### React web application for Pinpointscore.

Remove files in gitignore that you want to keep in the repository:

```bash
git rm -r --cached .
```

---

# Course
###### TypeScript Node proxy server for Pinpointscore.

Run: 
ts-node index.ts

Build Dockerfile: 
docker build -t pinpointscore/course .

Deploy to Azure Container Registry:
az login
az acr login --name pinpointscore

<!-- docker pull mcr.microsoft.com/mcr/hello-world
docker tag mcr.microsoft.com/mcr/hello-world pinpointscore.azurecr.io/samples/hello-world -->
docker build -t pinpointscore/course .
docker tag pinpointscore/course pinpointscore.azurecr.io/pinpointscore/course:latest

docker push pinpointscore.azurecr.io/pinpointscore/course:latest

test the container:
docker run -d -p 8080:8080 pinpointscore.azurecr.io/pinpointscore/course

---

# Clubhouse
###### Spring Boot Java backend application for Pinpointscore.

https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-21

https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.5.3&packaging=jar&jvmVersion=21&groupId=golf.pinpointscore&artifactId=clubhouse&name=clubhouse&description=Clubhouse%20for%20Pinpointscore&packageName=golf.pinpointscore.clubhouse&dependencies=lombok,docker-compose,web,security,data-jpa,h2,data-jdbc,devtools

Start the application:
```bash
./gradlew bootRun
```

Build:
```bash
./gradlew build && java -jar build/libs/pinpointscore-clubhouse-1.0.0.jar
```

Docker:
```bash
docker build --build-arg JAR_FILE=build/libs/\*.jar -t pinpointscore/clubhouse .
docker tag pinpointscore/clubhouse pinpointscore.azurecr.io/pinpointscore/clubhouse:latest
docker push pinpointscore.azurecr.io/pinpointscore/clubhouse:latest
./gradlew bootBuildImage --imageName=pinpointscore/clubhouse
```

---

# Caddy
###### React Native mobile application for Pinpointscore.
