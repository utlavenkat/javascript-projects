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
docker build -t hello-world-app .
```

### Run the Container
```bash
docker run -d -p 80:80 --name hello-world-app hello-world-app
```

Parameters explained:
- `-d` : Run in detached mode (background)
- `-p 80:80` : Map port 80 from container to port 80 on your laptop
- `--name hello-world-app` : Name the container
- `hello-world-app` : Image name

### Access the Application
Open your browser and navigate to:
```
http://localhost
```

### View Container Logs
```bash
docker logs hello-world-app
```

### Stop the Container
```bash
docker stop hello-world-app
```

### Remove the Container
```bash
docker rm hello-world-app
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
docker run -d -p 8080:80 --name hello-world-app hello-world-app
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
docker rmi hello-world-app
```

### View container details
```bash
docker inspect hello-world-app
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
docker logs hello-world-app
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
