# Stage 1: Builder
FROM ubuntu:20.04 AS builder

WORKDIR /app

# Mongodb Enterprise version installation
RUN apt-get update && \
  apt-get install gnupg curl -y && \
  curl -fsSL https://pgp.mongodb.com/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor && \
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.com/apt/ubuntu focal/mongodb-enterprise/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-enterprise-7.0.list && \
  apt-get update && \
  apt-get install -y mongodb-enterprise

# Install Node.js
RUN apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs


# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies and build the application
RUN npm install

# copy rest of the files
COPY . .

# build 
RUN npm run build:prod

# copy the build and delete the folder where code resides
RUN cp -r ./build ../app-final && rm -r /app

# set working directory  where the new build resides 
WORKDIR /app-final

# copy assets and package.json files
COPY src/assets ./src/assets
COPY package*.json ./

# install only prod dependencies
RUN npm install --only=production

# Set the default port as an environment variable
ENV PORT=3000

# Expose the port that the app will listen on
EXPOSE $PORT

# Set the command to start the application
CMD ["npm","run", "start:prod"]
