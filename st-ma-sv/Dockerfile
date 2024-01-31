
# FROM node:18

# WORKDIR /app

# COPY ./package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm","start" ]

# Stage 1: Build Node.js Application
FROM node:18 AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

# Stage 2: Build Final Image with SonarQube
FROM sonarqube:latest

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Expose ports
EXPOSE 3000

# Define entry point and command
CMD ["npm", "start"]
