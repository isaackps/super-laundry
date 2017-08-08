import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import expressValidator from 'express-validator';
import passport from 'passport';
import session from 'express-session';
//import flash from 'express-flash';
import flash from 'connect-flash';
//import bcrypt from 'bcrypt';
import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
// import mongoose
import mongoose from 'mongoose';
import mongo from 'mongodb';


// import route files
import index from './routes/index';

//API keys and passport configuration.
const passportConfig = require('./routes/index');

/**
 * Create Express server.
 */
// keys
//const fs = require('fs');
//const key = fs.readFileSync('./keys/realtimemaps.pem');
//const cert = fs.readFileSync('./keys/realtimemaps-cert.pem');

//const option = {
//  key: key,
//  cert: cert
//};

// initialize the app
const app = express();
//const debug = Debug('super-laundry:app');
//const server = require('https').Server(option, app);
//const io = require('socket.io')(server);

//connect to mongo DB
mongoose.connect('mongodb://heroku_r7mpvdtx:heroku_r7mpvdtx@ds127892.mlab.com:27892/heroku_r7mpvdtx');
//const db = mongoose.connection;

// Create seed (only need if the database got nothing)
//require('./seed');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// connect flash
app.use(flash());


// global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next()
});

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log(err);
  //debug('Caught exception: %j', err);
  process.exit(1);
});

//set port
// app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started on port ' +app.get('port'));
});



export default app;
