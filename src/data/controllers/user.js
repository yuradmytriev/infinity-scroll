import jwt from 'jsonwebtoken';

import {User as user} from '../models';
import config from './../../config.js';

const secret = config.auth.jwt.secret;

export default class User {
  static register(req, res) {
    const data = req.body;
    const users = new user(data);
    users.save(err => {
      if (err) throw err;

      res.json({
        success: true,
        message: 'User saved successfully',
      });
    });
  }
  static authenticate(req, res) {

    const {name, password} = req.body;

    user.findOne({name}, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(401).send('Authentication failed. User not found.');
      if (user.password !== password) return res.json({ success: false, message: 'Authentication failed. Wrong password.' });

      const token = jwt.sign({}, secret, {
        expiresIn: 86400,
      });

      res.json({
        success: true,
        token,
      });

    });

  }
}