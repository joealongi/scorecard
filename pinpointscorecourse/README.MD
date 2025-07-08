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