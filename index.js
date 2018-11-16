const path = require('path');
const express = require('express');
const app = require('./api/app');

const LISTEN_IP = process.env.CDV_API_LISTEN_IP || '0.0.0.0';
const LISTEN_PORT = process.env.CDV_API_LISTEN_PORT || 4242;

app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.listen(LISTEN_PORT, LISTEN_IP, () => {
  console.log(`listening on ${LISTEN_IP}:${LISTEN_PORT}`);
});
