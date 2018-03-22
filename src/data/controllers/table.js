import dummy from 'mongoose-dummy';

import {Table as table} from '../models';

const ignoredFields = ['_id','created_at', '__v'];

export default class Table {

  static findAll(res) {
    table.find({}, (err, users) => {
      if (err) throw err;
      res.json(users)
    })
  }

  static findByChunk(res, chunk) {
    table
      .find({})
      .skip(chunk)
      .limit(40)
      .exec((err, users) => {
        if (err) throw err;
        res.json(users)
      });

  }

  static findBy(req, res) {
    table.find({name: req.params.params}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  }

  static dummyDB(req, res) {
    for( let i = 0; i < 10000; i++ ) {
      let randomObject = dummy(table, {
        ignore: ignoredFields,
        returnDate: true
      });
      new table(randomObject).save(err => {
        if (err) throw err;
      });
    }

    res.json({
      success: true,
      message: 'dummyDB created',
    });
  }
}