import mongoose from 'mongoose';

const placesSchema = mongoose.Schema({
  company: String,
  longitude: Number,
  latitude: Number,
  address: String,
  openingHours: String
});



const Places = mongoose.model('Places', placesSchema);

module.exports = Places;
