import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}));

export default User;