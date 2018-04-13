var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var local_strategy = require('passport-local').Strategy;
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);


var index = require('./routes/index');
var signup = require('./routes/signup');
var users = require('./routes/users');
var accounts = require('./routes/accounts');
var split = require('./routes/split');
var resumeViewing = require('./routes/resumeViewing');
var settings = require('./routes/settings');

var multer  = require('multer')

var redirect = require('./routes/redirect');
var individual = require('./routes/individual');


//Database set up: MONGOOSE
var mongoose = require('mongoose');
mongoose.connect("mongodb://levyshi:CSE442@ds119772.mlab.com:19772/cracking_the_resume");

//Seeds file
seedDB = require("./seeds");

// Remove all user data from the data
//seedDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static("../Resumes"));
app.use(express.static("public"));
app.use(express.static("Resumes"))

//add session middleware to save session in the database
app.use(session({
    secret:'secret',
    resave:'true',
    saveUninitialized: 'true',
    store: new MongoStore({mongooseConnection:mongoose.connection})
}));

// app.use(function(req, res, next) {
//     res.locals.user = req.session.user;
//     next();
// });

app.use(flash());

//intialize passport session
app.use(passport.initialize());
app.use(passport.session());

//routing all the pages
app.use('/', index);
app.use('/signup', signup);
app.use('/users', users);
app.use('/accounts', accounts);
app.use('/split', split);
app.use('/resumeViewing', resumeViewing);
app.use('/settings', settings);
app.use('/redirect', redirect);
app.use('/individual', individual);
app.use(express.static("../Resumes"));



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
