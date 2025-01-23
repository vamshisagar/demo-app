# Stage 1: Build React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code and build it
COPY . .
RUN npm run build

# Stage 2: Set up production environment
FROM node:18

# Set working directory
WORKDIR /app

# Copy the React build and db.json to the production image
COPY --from=build /app/build ./build
COPY db.json ./db.json

# Install JSON server and serve
RUN npm install -g serve json-server

# Expose the app port
EXPOSE 3000
EXPOSE 3001

# Start JSON server and React app using a custom script
CMD ["sh", "-c", "json-server --watch db.json --port 3001 & serve -s build -l 3000"]
