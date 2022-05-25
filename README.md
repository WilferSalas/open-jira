# Open Jirea -- Project in Progress

---

## Description:

Project made with React, TypeScript and MUI

Site deployed with Vercel: https://open-jira-wilfersalas.vercel.app/

# Requeriments:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)

# Installation:

Open a console (terminal) and create the **open-jira**'s folder. Once folder is created, follow this instructions

```bash
# Clone project
$ git clone https://github.com/WilferSalas/open-jira.git

# Enter to project's folder
$ cd open-jira

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
