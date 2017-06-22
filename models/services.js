import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const serviceSchema = mongoose.Schema({
  service: String,
  company: String,
  collectionTime: String,
  contact: Number
});



const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
