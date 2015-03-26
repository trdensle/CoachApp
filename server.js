var express = require('express');   //npm install each
var session = require('express-session');
var bodyParser = require('body-parser');
var connect = require('connect');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;  //using a local storage for encryption
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

var User = require('./api/models/User');  //since referencing User.findOne (line 19), we need to require the folder for User.
var playerController = require('./api/controllers/playerController')
var UserController = require('./api/controllers/UserController') //allows the app to use the controllers in this file


mongoose.connect('mongodb://localhost/player');

passport.use(new LocalStrategy({
	usernameField: 'email',     //defining that we are using username as email. Otherwsise 
	passwordField: 'password'
}, function(username, password, done) {
	User.findOne({ email: username }).exec().then(function(user) {  //exec() executes the query  //this line runs a query to test the password and username in the database
		if (!user) {   //if no user, return done
			return done(null, false);
		}
		user.comparePassword(password).then(function(isMatch) {
			if (!isMatch) {      //if user info does not match, return error
				return done(null, false);
			}
			return done(null, user);
		});
	});
}));

passport.serializeUser(function(user, done) {
	//input user model (mongoose)
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	//user object (json)
	done(null, obj);
});


var app = express();
app.use(express.static(__dirname+'/public'));   // this is middleware that only allows the user to access the public folder. Add to a saved profile. 
app.use(bodyParser.json());
app.use(session({
	secret: 'R1verton19', saveUninitialized: true, resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/auth', passport.authenticate('local'), function(req, res) {  //authenticating a user    //if using OAuth, you would use GET method.
	// console.log('req.body: ', req.body, 'res: ', res);
	//if auth was successful, this will happen
	return res.status(200).end();
});

app.post('/api/register', function(req, res) {
	//create a user
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err) {
			return res.status(500).end();  
		}
		return res.json(user);
	});
});

var isAuthed = function(req, res, next) {    //middleware to run to make sure the user is logged in
	if (!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
};

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//endpoints =========================

	//players
app.get('/api/players', playerController.list);     	//fetches a list of players for coach/user 
app.post('/api/players', playerController.create);	    //creates a new player
app.put('/api/players/:id', playerController.update);   //save and updates the player item
app.delete('/api/removePlayer/:id', playerController.remove);  //removing player



app.get('api/currentUser', function(req, res) {         //keeps user logged in   Current User
	res.status(200).json(req.user);
});

app.get('/api/profile', playerController.list);		//fetches profile details
app.get('/api/profile',  UserController.profile);    	//return users profile

app.listen(9998);