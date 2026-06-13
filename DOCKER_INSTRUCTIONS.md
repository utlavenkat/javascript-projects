# Docker Deployment Instructions

## Prerequisites
- Docker Desktop installed on your laptop ([Download Docker Desktop](https://www.docker.com/products/docker-desktop))
- Docker daemon running

## Option 1: Using Docker Compose (Recommended - Easiest)

### Build and Run
```bash
docker-compose up --build
```

This command will:
- Build the Docker image
- Start the container
- Expose the app on port 80

### Access the Application
Open your browser and navigate to:
```
http://localhost
```

### Stop the Container
```bash
docker-compose down
```

---

## Option 2: Using Docker Commands Directly

### Build the Image
```bash
docker build -t javascripts-projects .
```

### Run the Container
```bash
docker run -d -p 80:80 --name javascripts-projects javascripts-projects
```

Parameters explained:
- `-d` : Run in detached mode (background)
- `-p 80:80` : Map port 80 from container to port 80 on your laptop
- `--name javascripts-projects` : Name the container
- `javascripts-projects` : Image name

### Access the Application
Open your browser and navigate to:
```
http://localhost
```

### View Container Logs
```bash
docker logs javascripts-projects
```

### Stop the Container
```bash
docker stop javascripts-projects
```

### Remove the Container
```bash
docker rm javascripts-projects
```

---

## Using a Different Port

If port 80 is already in use on your laptop, you can map to a different port:

### With Docker Compose
Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change from 80:80 to 8080:80
```

Then run:
```bash
docker-compose up --build
```

Access at: `http://localhost:8080`

### With Docker Commands
```bash
docker run -d -p 8080:80 --name javascripts-projects javascripts-projects
```

Access at: `http://localhost:8080`

---

## Useful Docker Commands

### List running containers
```bash
docker ps
```

### List all containers (including stopped ones)
```bash
docker ps -a
```

### Remove an image
```bash
docker rmi javascripts-projects
```

### View container details
```bash
docker inspect javascripts-projects
```

---

## Troubleshooting

### Port already in use
If you get a "port already in use" error, either:
1. Stop the container that's using port 80
2. Use a different port (8080, 3000, etc.) as shown above

### Container exits immediately
Check the logs:
```bash
docker logs javascripts-projects
```

### Cannot connect to Docker daemon
Make sure Docker Desktop is running on your laptop.

---

## File Structure
```
.
├── index.html                 # Your HTML page
├── Dockerfile                 # Instructions to build the image
├── docker-compose.yml         # Docker Compose configuration
├── .dockerignore              # Files to exclude from build
└── DOCKER_INSTRUCTIONS.md     # This file
```
