# Scorecard

Work in progress, tread lightly, copy carefully.

## Teebox
###### React web application for Pinpointscore.

Remove files in gitignore that you want to keep in the repository:
```bash
git rm -r --cached .
```

Install dependencies:
```bash
npm install
```

Start the app:
```bash
npm run dev
```

---

## Course
###### TypeScript Node proxy server for Pinpointscore.

Start the application:
```bash
ts-node index.ts
```

Azure CR:
```bash
az login
az acr login --name pinpointscore
```

Docker:
```bash
docker build -t pinpointscore/course .
docker tag pinpointscore/course pinpointscore.azurecr.io/pinpointscore/pinpointscore/course:latest
docker push pinpointscore.azurecr.io/pinpointscore/course:latest
docker run -d -p 8080:8080 pinpointscore.azurecr.io/pinpointscore/pinpointscore/course
```

---

## Clubhouse
###### Spring Boot Java backend application for Pinpointscore.

https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-21

https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.5.3&packaging=jar&jvmVersion=21&groupId=golf.pinpointscore&artifactId=clubhouse&name=clubhouse&description=Clubhouse%20for%20Pinpointscore&packageName=golf.pinpointscore.clubhouse&dependencies=lombok,docker-compose,web,security,data-jpa,h2,data-jdbc,devtools

Start the application:
```bash
./gradlew bootRun --args='--spring.profiles.active=development'
```

Azure CR:
```bash
az login
az acr login --name pinpointscore
```

Build:
```bash
./gradlew build && java -jar build/libs/pinpointscore-clubhouse.jar
```

Docker:
```bash
docker build -t pinpointscore/clubhouse .
docker tag pinpointscore/clubhouse pinpointscore.azurecr.io/pinpointscore/pinpointscore/clubhouse:latest
docker push pinpointscore.azurecr.io/pinpointscore/pinpointscore/clubhouse:latest
docker run -p 8080:8080 pinpointscore.azurecr.io/pinpointscore/pinpointscore/clubhouse:latest
```

### Clubhouse - Database

Add a user to the database:
```sql
INSERT INTO dbo.user_entity (submitted, updated, user_id, user_name, user_first_name, user_last_name, user_email, user_country, user_city, user_course_id, user_course_name, user_handicap, user_rank) 
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'pinpointscore', 'Pinpoint', 'Score', 'pinpointscore@example.com', 'USA', 'Buffalo', 1, 'Country Club of Internet', 0, 1);
```

Search a users in the database by userId:
```sql
SELECT TOP 10 * 
FROM dbo.user_entity
ORDER BY user_id DESC;
```

Delete a user from the database:
```sql
DELETE FROM dbo.user_entity
WHERE user_id = 1;
```
This makes the submission unserializable, needs to be fixed, use the API
<!-- Add a scorecard to the database:
```sql
INSERT INTO dbo.scorecard_entity (submitted, updated, user_id, user_scores, golf_course, golf_course_pars) 
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, CONVERT(VARBINARY(MAX), '["4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4"]'), 'Country Club of Internet', CONVERT(VARBINARY(MAX), '["4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4"]'));
``` -->

Search scorecards in the database by userId:
```sql
SELECT TOP 10 * 
FROM dbo.scorecard_entity
ORDER BY user_id DESC;
```

Delete a scorecard from the database by userId and submitted timestamp:
```sql
DELETE FROM dbo.scorecard_entity
WHERE user_id = 1 AND submitted = '1901-01-01 00:00:00.000000';
```

Delete all scorecards from the database by userId:
```sql
DELETE FROM dbo.scorecard_entity
WHERE user_id = 1;
```

---

## Caddy
###### React Native mobile application for Pinpointscore.

Start the app

Install dependencies:
```bash
npm install
```

Start the app:
```bash
npx expo start
```

## TODO:

###### Add loader for leaderboard + scorecard pages
###### Simplify leaderboard by total is their seasonal score over par, potentially seed rankings of default data instead of all 10
###### Filter leaderboard by season with calendar selector
###### Write algorithm to calculate the leaderboard based on scores overall (par - score)
###### Create ranking table that runs as a result of a job to optimize performance
###### Create tournament leaderboard using current leaderboard and create a table for tournaments linking players and scorecards to tournament
###### Create handicap calculator that calculates the handicap based on the scores and the course par
###### Create a course table and input method to add courses
###### Create handicap calculator that calculates the handicap based on the scores and the course par
###### Replace custom SVGS with Icon Library
###### Add sitemap / page for footer
###### Authenticated routing
###### Optimize backend models to only return and accept what is needed
