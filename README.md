[![Build Status](https://github.com/nilscox/zetecom/workflows/build/badge.svg)](https://github.com/nilscox/zetecom/actions)
[![codecov](https://codecov.io/gh/nilscox/zetecom/branch/master/graph/badge.svg)](https://codecov.io/gh/nilscox/zetecom)

This is where the code of *Zétécom* lives. For more information about the project, have a look at the website, [https://zetecom.fr](https://zetecom.fr), if you understand french :).

The `master` branch is the one deployed in production, and the `dev` branch is deployed at [https://staging.zetecom.fr](https://staging.zetecom.fr).

Issuses and pull requests are welcome, if you want to contribute to the projet by any mean. Feel free to [contact](mailto:nils@nils.cx) the developers directly or join [the discord server](https://discord.gg/huwfqra) to talk about the project.

## Getting started

### Start the dependencies

Zetecom depends on third party services (database, mail provider, ...) that can be started using docker (and docker-compose).

```bash
docker-compose up -d postgres maildev redis
```

### Build the project images

The project is divided into two docker images: the backend and the front web application. Both can be built using docker-compose.

```bash
docker-compose build
```

The database instance (postgresql) will be accessible from localhost on port 5432, and the [maildev](https://github.com/maildev/maildev) SMTP is started on port 1025 and has a web interface accessible from http://localhost:1080.

### Start the backend

The backend (or "the API") should be ready to be launched using the default configuration provided in the main `docker-compose.yml` file in this repo's root directory. It will run the database migrations, the seeds, and start the NodeJS program inside a docker container.

```bash
docker-compose up api
```

The backend should be accessible directly from http://localhost:3000.

### Start the frontend

The webapp (or just "the app") can be started using docker-compose once again.

```bash
docker-compose up app
```

The app should be accessible from http://localhost:8000.

## Start the project for development

To start coding, you will want to start the projects in development mode, with live reload / hot reload enabled. These projects are:

- `./api`: the backend
- `./app`: the frontend
- `./website`: the website
- `./extension`: the extension
- `./e2e`: the end to end tests

All of them are standalone and have their own package.json.

So first of all, [start the dependencies](#start-the-dependencies) using docker.

Create the `.env` file from the `.env.example` corresponding to the project you want to start, and update the values according to your needs (the variables names should be self explanatory). The default values should be sufficient to start any project.

Then install the project dependencies and start the project.

```
yarn
yarn start
```

Before starting the backend, an extra step is necessary to prepare the database. Obviously it must exist (this is already the case when postgres was started with docker-compose), and the migrations and seeds must be run to create the tables, and fill them with some initial data. From the `api` directory, run

```yarn
yarn db:migrate
yarn db:seed
```

This should be enough to get you on track. If anything goes wrong, please let us know so we can look into it and update this documentation if necessary.
