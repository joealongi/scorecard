# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ARG PUBLIC_KEY
ARG PRIVATE_KEY

ENV PORT=8080
ENV PUBLIC_KEY=${PUBLIC_KEY}
ENV PRIVATE_KEY=${PRIVATE_KEY}
ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node", "dist/index.js" ]