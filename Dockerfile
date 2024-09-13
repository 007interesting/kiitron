FROM ubuntu:20.04

# Setup environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists
RUN apt-get update

# Install curl, necessary for Node.js setup
RUN apt-get install -y curl

# Install Node.js from NodeSource (e.g., Node.js 16.x)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs

# Install other core tools
RUN apt-get install -y git tar make wget libnss3 libx11-xcb1 libxss1 libgbm-dev libatk1.0-0 libgtk-3-0 libgdk-pixbuf2.0-0 libcairo2 libpango-1.0-0 libpangocairo-1.0-0

# Install any missing audio libraries
RUN apt-get install -y libasound2 || apt-get install -y liboss4-salsa-asound2

# Clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Electron globally
RUN npm install -g electron@latest

# Set the working directory in the Docker image
WORKDIR /app

# Copy your project files into the Docker image
COPY package.json .

# Install project dependencies
RUN npm install

COPY . .

# Command to run your application
CMD ["npm", "run", "dev"]
