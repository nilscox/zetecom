# Zétécom - browser extension

This extension's purpose is to inject an iframe in some websites, displaying a comments area where all messages must
respect a set of rules to ensure constructive debates.

## Build

To build this extension, make sure to have these tools installed in your system:

- node 12
- yarn 1

> Note: other node versions should work too

Install the dependencies with `yarn install`, then build it with `yarn build`.

```sh
42sh$ yarn install
42sh$ NODE_ENV=production yarn build
```

This will produce a `dist` folder containing the extension's build output.
