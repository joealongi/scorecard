#
# Build Stage
# This stage uses a full Node.js environment to install dependencies and build the application.
#
FROM node:22.19-alpine AS build
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's layer caching.
# This ensures that the 'npm install' step is only re-run if these files change.
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Run the build command
RUN npm run build

#
# Production Stage
# This stage uses a minimal Node.js environment to run the built application,
# reducing the final image size and improving security.
#
FROM node:22.19-alpine AS runner

# Create a non-root user for security
RUN adduser --system --no-create-home --uid 1000 nodeuser

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build --chown=nodeuser:nodeuser /app/dist ./dist

# Copy package.json to the production stage to ensure correct module resolution if needed
COPY --from=build --chown=nodeuser:nodeuser /app/package*.json ./

# Switch to the non-root user
USER nodeuser

# Set environment variables
ENV PORT=4040
ENV NODE_ENV=production

# Expose the application port
EXPOSE 4040

# The command to run the application
CMD [ "node", "dist/index.js" ]
