# Use nginx lightweight web server
FROM nginx:alpine

# Copy index.html to the nginx web root
COPY index.html /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
