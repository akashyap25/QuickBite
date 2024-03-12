# build environment
FROM node:alpine3.19 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Install the latest version of Parcel
RUN npm install -g parcel@latest

# Copy the rest of the application files
COPY . .

# Build the application using Parcel
RUN npm run build

# production environment
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Copy built files from the build stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
