const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { setErrorMessage, ExpressExtraError } = require('express-extra');
const { User } = require('../models');
const auth = require('./routes/authentication');
const information = require('./routes/information');
const user = require('./routes/user');

setErrorMessage('ERROR', 'ERROR');
setErrorMessage('BAD_REQUEST', 'BAD_REQUEST');
setErrorMessage('NOT_FOUND', 'NOT_FOUND');
setErrorMessage('AUTHORIZATION', 'AUTHORIZATION ERROR');
setErrorMessage('VALIDATION', 'VALIDATION ERROR');
setErrorMessage('MISSING_VALUE', 'MISSING_VALUE');
setErrorMessage('READ_ONLY_VALUE', 'READ_ONLY_VALUE');
setErrorMessage('INVALID_VALUE_TYPE', 'INVALID_VALUE_TYPE');

const app = module.exports = express();
const api = express.Router();

app.use(bodyParser.json());

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', req.get('origin') || '*');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true');
    next();
  });
}

app.use(async (req, res, next) => {
  if (!req.session.userId)
    return next();

  try {
    const user = await User.findById(req.session.userId);

    if (user)
      req.user = user;
    else
      delete req.session.userId;

    next();
  } catch (e) {
    next(e);
  }
});

api.use('/auth', auth);
api.use('/information', information);
api.use('/user', user);

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
