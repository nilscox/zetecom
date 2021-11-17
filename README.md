[![Build Status](https://github.com/nilscox/zetecom/workflows/build/badge.svg)](https://github.com/nilscox/zetecom/actions)

<!-- [![codecov](https://codecov.io/gh/nilscox/zetecom/branch/master/graph/badge.svg)](https://codecov.io/gh/nilscox/zetecom) -->

This is where the code of _Zétécom_ lives. For more information about the project, have a look at the website, [https://zetecom.fr](https://zetecom.fr), if you understand french :).

The `master` branch is the one deployed in production, and the `dev` branch is deployed at [https://staging.zetecom.fr](https://staging.zetecom.fr).

Issuses and pull requests are welcome, if you want to contribute to the projet by any mean. Feel free to [contact](mailto:nils@nils.cx) the developers directly or join [the discord server](https://discord.gg/huwfqra) to talk about the project.

## Getting started

### Project overview

The project is divided into multiple packages:

- `./api`: the backend, based on [nestjs](https://nestjs.com)
- `./packages/app-core`: the frontend's core logic, based on [redux](redux.js.org)
- `./packages/app-infra`: the frontend's views, based on [react](https://reactjs.org)
- `./extension`: the chrome / firefox extension, following the [WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- `./website`: the project's website
- `./e2e`: the end-to-end tests, based on [testea](github.com/nilscox/testea)
- `./scripts`: a set of scripts to deploy the project, based on [bash](https://ba-sh.com)

### Start the dependencies

Zetecom depends on third party services (database, mail provider, ...) that can be started using docker (and docker-compose).

```bash
docker-compose up -d postgres maildev redis
```

### Start the backend

The backend should be ready to be launched using the default configuration provided in the main `docker-compose.yml` file in this repo's root directory. It will run the database migrations, seed the database with an admin user, and start the NodeJS program inside a docker container. It then should be accessible directly from http://localhost:3000.

```bash
docker-compose build
docker-compose up -d api
```

The database instance (postgresql) will be accessible from localhost on port 5432, and [maildev](https://github.com/maildev/maildev), a SMTP server, will be started on port 1025 and has a web interface accessible from http://localhost:1080.

### Start the frontend

The webapp can be built as a static site that can be served with any web server such as [nginx](https://www.nginx.com/) or [serve](npmjs.com/package/serve).

```bash
cd app
yarn
yarn build
npx serve -s -l 8000 dist
```

The app should then be accessible from http://localhost:8000.

## Start the project for development

To start coding, you will want to start the projects in development mode, with live reload / hot reload enabled. All the packages have their own package.json, which contain a `start` script to start in dev mode.

So first of all, [start the dependencies](#start-the-dependencies) using docker.

Create the `.env` file from the `.env.example` corresponding to the project you want to start (if any), and update the values according to your needs (the variables names should be self explanatory). The default values should be sufficient to start any project.

Then install the dependencies and launch it.

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
