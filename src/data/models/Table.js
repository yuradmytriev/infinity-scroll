import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Table = mongoose.model('Table', new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  data: {
    type: String,
  },
  company: {
    type: String,
  },
  score: {
    type: Number
  },
  course: {
    type: Number
  },
  password: {
    type: Number
  },
  is_bool: {
    type: Boolean
  },
  words: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}));

export default Table;