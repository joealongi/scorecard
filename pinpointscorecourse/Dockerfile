# ---- Build Stage ----
    FROM node:20-alpine AS build

    WORKDIR /usr/app
    
    COPY package*.json ./

    RUN npm install
    
    COPY . ./

    RUN npm run build
    
    # ---- Production Stage ----
    FROM node:20-alpine
    
    WORKDIR /usr/app
    
    COPY --from=build /usr/app/package*.json ./
    COPY --from=build /usr/app/node_modules ./node_modules
    COPY --from=build /usr/app/dist ./dist
    
    ENV NODE_ENV=production
    ENV PORT=8080
    
    EXPOSE 8080
    
    CMD [ "node", "dist/index.js" ]