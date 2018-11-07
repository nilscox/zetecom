const path = require('path');
const express = require('express');
const app = require('./api/app');

const LISTEN_PORT = process.env.LISTEN_PORT || 4242;
const LISTEN_IP = process.env.LISTEN_IP || '0.0.0.0';

app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.use((req, res, next) => {
  res.status(404).end();
});

app.listen(LISTEN_PORT, LISTEN_IP, () => {
  console.log(`listening on ${LISTEN_IP}:${LISTEN_PORT}`);
});
