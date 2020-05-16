# Réagir à l'information - browser extension

This extension's purpose is to inject an iframe in some websites, displaying a comments area where all messages must
respect a set of rules to ensure constructive debates.

## Prodution and staging releases

Two versions of this extension exists: a production and a staging version. The production version is relased through
[https://addons.mozilla.org](https://addons.mozilla.org), and the staging one is hosted on the project's staging
website.

The staging version is used to test the extension's functionnalities before releasing the production version. There are
two differences in the build process to create one version or the other:

- the environment variables
- the `name` key in the `manifest.json`

## Build

To build this extension, make sure to have these tools installed in your system:

- node 12.16.3
- yarn 1.22.4

> Note this build process was only tested on archlinux, but should work with any linux distribution.

First, install the dependencies with `yarn`.

```sh
42sh$ yarn install
```

Then, copy the `.env.example` file, and replace the variables values with the ones corresponding to the target extension
version (staging or production).

```sh
42sh$ cp .env.example .env
42sh$ $EDITOR .env
```

The extension is now ready to be built using webpack.

```sh
42sh$ yarn build
```

This will produce a `dist` folder containing all the extension's files (the root folder of the extension, containing a
copy of the `manifest.json`).

To build a `staging` version of the extension, edit the `dist/manifest.json` file, and append ` (staging)` to the value
associated with the `name` key (leave it unchanged for a production version).

Finally, package the extension into a zip file.

```sh
42sh$ yarn zip
```
