# Use nginx lightweight web server
FROM nginx:alpine

# Copy entire project directory to the nginx web root
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
