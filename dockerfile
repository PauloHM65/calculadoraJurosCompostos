# Use a lightweight Nginx image as the base
FROM nginx:alpine

# Copy the application files into the Nginx default web root
COPY index.html /usr/share/nginx/html/
COPY index.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80, which Nginx listens on by default
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]