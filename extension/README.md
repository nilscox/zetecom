# Réagir à l'information - browser extension

This extension's purpose is to inject an iframe in some websites, displaying a comments area where all messages must
respect a set of rules to ensure constructive debates.

## Build

To build this extension, make sure to have these tools installed in your system:

- node 12.16.3
- yarn 1.22.4

> Note: this build process was only tested on archlinux, but should work with any linux distribution.

First, install the dependencies with `yarn`.

```sh
42sh$ yarn install
```

Then, copy the `.env.example` file, and replace the variables values with the ones corresponding to the target extension
version (staging or production).

> Note: the source archive provided to the mozilla addon review team already includes the correct .env file

```sh
42sh$ cp .env.example .env
42sh$ $EDITOR .env
```

The extension is now ready to be built using webpack.

```sh
42sh$ NODE_ENV=production yarn build
```

This will produce a `dist` folder containing all the extension's files (the root folder of the extension, containing a
copy of the `manifest.json`).
