# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the full source code
COPY . .

# Build the app (assuming this produces a /build directory)
RUN npm run build:prod

# Stage 2: Production image
FROM node:22-alpine AS final

# Create working directory
WORKDIR /app

# Copy only the production build from builder stage
COPY --from=builder /app/build ./

# If assets are needed separately, copy them too
COPY --from=builder /app/src/assets ./src/assets

# Copy package.json and lock file
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

COPY .env ./

# Environment setup
ENV PORT=3000
EXPOSE $PORT

# Start the app
CMD ["npm", "run", "start:prod"]
