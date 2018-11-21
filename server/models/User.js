const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;
const {isEmail} = validator;


const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please enter a valid email address.'],
    validate: [isEmail, 'Please enter a valid email address.']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a password.'],
    minlength: [6, 'Password must be of minimum 6 characters length.']
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required.']
  }
});


userSchema.post('save', (error, doc, next) => {
  if(error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email is already in use.'));
  } else if(error.name === 'ValidationError') {
    let errors = Object.values(error.errors).map(({message}) => message);
    let first = errors.slice(0, 1)
    next(new Error(first))
  } else {
    next(error)
  }
})


userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err)
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err)
      user.password = hash;
      next()
    });
  });
})


userSchema.methods.checkPassword = function(password, next) {
  bcrypt.compare(password, this.password, function(err, res) {
    next(err, res);
  });
}


const User = mongoose.model('User', userSchema);
module.exports = User;