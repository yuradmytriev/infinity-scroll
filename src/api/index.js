const routes = require('express').Router();
import jwt from 'jsonwebtoken';

import config from './../config.js';
import {User} from './../data/controllers';
import {Table} from './../data/controllers';


routes.post('/register', (req, res) => User.register(req, res));
routes.post('/authenticate', (req, res) => User.authenticate(req, res));

routes.get('/setup-db', (req, res) => Table.dummyDB(req, res));

routes.post('/chunk', (req, res) => {
  const chunk = req.body.chunk;
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.auth.jwt.secret, (err, decoded) => {
      if (err) return res.json({ success: false, message: 'Failed to authenticate token.' });
      req.decoded = decoded;
      Table.findByChunk(res, chunk)
    });
  } else {
    return res
      .status(403)
      .send({
        success: false,
        message: 'No token provided.'
      });
  }
});
routes.get('/tables', (req, res) => Table.findAll(res));
routes.get('/tables/:params', (req, res) => Table.findBy(req, res));


export default routes;