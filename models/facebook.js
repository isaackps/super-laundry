import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const facebookSchema = mongoose.Schema({
  name: String,
  email: String
}, { timestamps: true });


const Facebook = mongoose.model('Facebook', facebookSchema);

module.exports = Facebook;

module.exports.getUserByName = function(name, callback){
  const query = {name: name};
  Facebook.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email};
  Facebook.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  Facebook.findById(id, callback);
}
