import express from 'express';
import User from '../models/user';
import Place from '../models/places';
import Service from '../models/services';
import expressValidator from 'express-validator';
import bcrypt from 'bcrypt';
import passport from 'passport';
import mongodb from 'mongodb';

import Facebook from '../models/facebook';

const LocalStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();

function checkAuthenticated(req,res,next) {
  if(req.isAuthenticated()){
    res.redirect('/dashboard');
    //return next();
    console.log('success');
  }else{
    res.redirect('/');
  }
}


//passport facebook loginMessage
  // Passport facebook login
  passport.use('facebook', new facebookStrategy({
      clientID: '243669972799969',
      clientSecret: '8eb5962c62aad9dff714c22e673ea153',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['name'],
      passReqToCallback: true
    },
    function( req, accessToken, refreshToken, profile, done){
        console.log(profile);
    }));



router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

/**
 * ONLY ALLOW ACCESS TO SECRET ROUTES IF USER IS LOGGED IN
 */
function loggedIn(req, res, next) {

    console.log(req.user);

    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// router.all('/*', function(req, res, next){
//     loggedIn(req, res, next)
//     //next();
// });

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Super Laundry'
  });
});


//login
router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Log in'
  });
});

//register
router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Sign up'
  });
});

// Get stores as JSON
router.get('/json/storelocations', (req, res, next) => {

  Place.find({}, (err, places) => {
    res.json(places);
  });
});

//store locations
router.get('/dashboard/storelocations', (req, res, next) => {
  res.render('storelocations', {
    title: 'Store Locations'
  });

});

router.get('/dashboard/settings', (req, res, next) => {
  res.render('setting', {
    title: 'Settings'
  });
});

//register
router.get('/dashboard/services', (req, res, next) => {
  res.render('services', {
    title: 'Services'
  });
});

router.post('/dashboard/services', (req, res, next) => {
  req.checkBody('contact', 'contact field cannot be empty').notEmpty();
  req.checkBody('contact', 'contact must be a working number').len(8,9);

  const errors = req.validationErrors();

  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);

    res.render('services', {
      title: 'Error! please make sure you have entered in the valid details!',
      errors: errors
    });
  }
  else {
    const service = req.body.service;
    const company = req.body.company;
    const collectionTime = req.body.collectionTime;
    const contact = req.body.contact;

    const services = new Service({
      service: service,
      company: company,
      collectionTime: collectionTime,
      contact: contact
    });

    services.save((err, service) => {
      if(err) {
        console.log(err);
        res.render('services', {
          title: 'Error! Dont Know Why? Must be computer Stupid!!!'
        });
      }
      req.flash('success_msg', 'Your service has been entered, a confirmation emil will be sent to you shortly. Thank You!');
      res.redirect('/dashboard/services');
    });
  }
});


router.post('/signup', (req, res, next) => {
  // validation
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
  // Additional validation to ensure username is alphanumeric with underscores and dashes
  req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

  const errors = req.validationErrors();

  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);

    res.render('signup', {
      title: 'Sign Up Error!',
      errors: errors
    });
  }
  else {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;


  console.log(username);
  console.log(email);
  console.log(password);


    const user = new User({
      username: username,
      email: email,
      password: password
    });

    user.save((err, user) => {
      if(err) {
        console.log(err);
        res.render('signup', {
          title: 'Sign Up Error!'
        });
      }
      req.flash('success_msg', 'You are registered and can now login!');
      res.redirect('/login');
    });
}       // close else statement
});     // close router.post


router.get('/dashboard', loggedIn, (req, res, next) => {
    //loggedIn(req, res, next)
    //const username = req.user.username;
    res.render('dashboard', {
      title: 'Dashboard',
      username: 'Welcome '+req.user.username
    });




});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user) {
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        }else{
          return done(null, false, {message: 'Invalid Password'});
        }
      })

    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

router.post('/login',
  passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/login', failureFlash: true}));
  // function(req, res) {
  //   console.log('login success')
  //   res.redirect('/dashboard');
  // });

router.get('/logout', function(req,res){
  req.logout();
  console.log(req.user)
  req.flash('success_msg', 'You are logged out');

  res.redirect('/login');
});






export default router;
