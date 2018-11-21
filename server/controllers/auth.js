const _ = require('lodash');
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const {isEmail} = validator;


function signup({args, req}) {
  let fields = ['email', 'password', 'firstName', 'lastName']
  let userData = _.pick(args, fields)
  return new Promise((resolve, reject) => {
    new User(userData).save()
      .then(user => req.logIn(user, err => {
        if(err) reject(err)
        resolve(user)
      }))
      .catch(err => reject(err.message || err))
  })
}


function login({email, password, req}) {
  if(!email || !isEmail(email)) {
    throw new Error('Please provide a valid email.');
  }

  if(!password) {
    throw new Error('Please provide a password.');
  }

  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      if(err) reject(err);
      if(!user) reject(info.message || info);

      req.logIn(user, err => {
        if(err) reject(err);
        resolve(user)
      })
    })({body: {email, password}})
  })
}


module.exports = {
  signup,
  login
}