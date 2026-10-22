# Use the official Nginx Alpine image for a lightweight static file server
FROM nginx:alpine

# Copy the entire project directory into Nginx's default HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
