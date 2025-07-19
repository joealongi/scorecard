# Teebox
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

# Course
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

# Clubhouse
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

## Clubhouse - Database

Add user to the database:
```sql
INSERT INTO dbo.user_entity (submitted, updated, user_id, user_name, user_first_name, user_last_name, user_email, user_country, user_city, user_course, user_handicap) 
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'pinpointscore', 'Pinpoint', 'Score', 'pinpointscore@example.com', 'USA', 'Buffalo', 'Country Club of Internet', 0);
```

Search users in the database:
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

Add scorecards to the database:
```sql
INSERT INTO dbo.scorecard_entity (submitted, updated, user_id, golf_course, golf_course_par, holes_played, total_score, hole_one_score, hole_two_score, hole_three_score, hole_four_score, hole_five_score, hole_six_score, hole_seven_score, hole_eight_score, hole_nine_score, hole_ten_score, hole_eleven_score, hole_twelve_score, hole_thirteen_score, hole_fourteen_score, hole_fifteen_score, hole_sixteen_score, hole_seventeen_score, hole_eighteen_score) 
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Country Club of Internet', 72, 18, 72, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4);
```

Search scorecards in the database:
```sql
SELECT TOP 10 * 
FROM dbo.scorecard_entity
ORDER BY user_id DESC;
```

Delete score card from the database:
```sql
DELETE FROM dbo.scorecard_entity
WHERE user_id = 1 AND submitted = '1901-01-01 00:00:00.000000';
```

Delete all score cards from the database:
```sql
DELETE FROM dbo.scorecard_entity
WHERE user_id = 1;
```

---

# Caddy
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

# TODO:

###### Create a leaderboard page that displays the top golfers based on their scores.
- Need to update java and db
- Write algorithm to calculate the leaderboard based on scores overall (par - score)
- Create ranking table that runs as a result of a job to optimize performance
```
// TODO: Sort the leaderboard by rank
// type LeaderboardItem = {
//   rank: number;
//   username: string;
//   course: string;
//   total: number;
//   scores: number[];
// };
```

###### Create components for pages
- Create react components for each page
```
{/* H1 Todo: Make this a component */}
{/* H2 Todo: Make this a component */}
{/* H3 Todo: Make this a component */}
{/* Intro Todo: Make this a component */}
{/* P Todo: Make this a component */}
```

###### Lighten inputs