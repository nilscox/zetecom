const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { ExpressExtraError } = require('express-extra');
const auth = require('./routes/authentication');
const information = require('./routes/information');

const app = module.exports = express();
const api = express.Router();

app.use(bodyParser.json());

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true,
}));

api.use('/auth', auth);
api.use('/information', information);

app.use('/api', api);

app.use((err, req, res, next) => {
  if (err instanceof ExpressExtraError) {
    console.log(err.toString());
    res.status(err.status).json(err.toJSON());
  } else {
    console.log(err);
    res.status(500).send('ERROR: ' + err.message);
  }
});

app.use((req, res, next) => {
  res.status(404).end();
});
