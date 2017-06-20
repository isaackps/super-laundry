import express from 'express';
import User from '../models/user';
import expressValidator from 'express-validator';
import bcrypt from 'bcrypt';
import passport from 'passport';

const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

/**
 * ONLY ALLOW ACCESS TO SECRET ROUTES IF USER IS LOGGED IN
 */
// function loggedIn(req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// };

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


router.get('/dashboard', (req, res, next) => {
    //loggedIn(req, res, next)
    res.render('dashboard', {
      title: 'Dashboard'
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
  passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/logout', function(req,res){
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/login');
});


export default router;
