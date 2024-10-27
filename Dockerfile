# Use the official Node.js image as a base
FROM node:14

# Set the working directory
WORKDIR C:\Users\bforb\OneDrive\Documents\Todo app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose ports for all four servers
EXPOSE 3019 3020 3021 3022

# Command to run the combined server
CMD ["node", "combined-server.js"]
