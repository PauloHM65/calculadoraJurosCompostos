# Use a lightweight Nginx image as the base
FROM nginx:alpine

# Remove the default Nginx configuration file to avoid conflicts
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file into the container
# This tells Nginx to listen on port 5569
COPY nginx.conf /etc/nginx/conf.d/your_app.conf 
# You can name this anything ending with .conf

# Copy the application files into the Nginx default web root
COPY index.html /usr/share/nginx/html/
COPY index.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 5569 (This now correctly reflects the listening port in Nginx config)
EXPOSE 5569

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]