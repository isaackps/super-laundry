import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String

}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
