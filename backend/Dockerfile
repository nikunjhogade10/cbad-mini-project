FROM node:18-alpine

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --omit=dev

# Copy application source
COPY . .

# Expose backend port
EXPOSE 5050

# Set environment variables
ENV PORT=5050
ENV NODE_ENV=production

# Start Node API server
CMD ["node", "src/server.js"]
