import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  email: {type:String, unique: true},
  password: String

}, { timestamps: true });


/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
// userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };
//
// userSchema.methods.getUserByUsername = function(username, callback){
//   const query = {username: username};
//   User.findOne(query, callback);
// }
//
//
// userSchema.methods.getUserById = function(id, callback){
//   User.findById(id, callback);
// }


const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}
