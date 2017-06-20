import express from 'express';
import User from '../models/user';
import expressValidator from 'express-validator';
const router = express.Router();

/**
 * ONLY ALLOW ACCESS TO SECRET ROUTES IF USER IS LOGGED IN
 */
function loggedIn(req, res, next) {
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

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login'
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Sign up'
  });
});

router.post('/signup', (req, res, next) => {

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
      res.render('signup');
    }
    res.redirect('/dashboard');
  });

  }
});


router.get('/dashboard', (req, res, next) => {
    loggedIn(req, res, next)
    res.render('dashboard', {
      title: 'Dashboard'
    });
});

export default router;
