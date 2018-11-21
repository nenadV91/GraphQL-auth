const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, cb) => {
  cb(null, user.id)
});

passport.deserializeUser((id, cb) => {
  User.findById(id).select('email firstName lastName')
    .then(user => cb(null, user))
    .catch(err => cb(err))
})

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  function(email, password, cb) {
    User.findOne({ email }, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, 'Wrong username or password.'); }
      user.checkPassword(password, (err, match) => {
        if(err) return cb(err);
        if(match) return cb(null, user)
        return cb(null, false, 'Wrong username or password.')
      })
    });
  }));
