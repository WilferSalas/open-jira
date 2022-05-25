# NextJS baseline

---

## Description:

NextJS baseline with TypeScript and MUI V5

# Requeriments:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)

# Installation:

Open a console (terminal) and create the **next-baseline**'s folder. Once folder is created, follow this instructions

```bash
# Clone project
$ git clone https://github.com/WilferSalas/next-baseline.git

# Enter to project's folder
$ cd next-baseline

# Install dependencies
$ npm i

# Run the project
$ npm run dev

# Go to
http://localhost:3000
```

# Create Docker image:

Install Docker on your machine
- [Docker Desktop](https://docs.docker.com/get-docker/)

Open a console (terminal) and follow this instructions

```bash
# Build your container
$ docker build -t nextjs-docker .

# Run your container
$ docker run -p 3000:3000 nextjs-docker
```
