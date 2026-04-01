# Use Node.js LTS version as base image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app (for React/Next.js, adjust if pure Node API)
RUN npm run build

# Expose port (adjust if your app uses a different one)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]