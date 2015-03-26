var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

var schema = mongoose.Schema({
	email: { type: String, unique: true },
	password: {type: String}
});

schema.pre('save', function(next) {
	var user = this;     
	if (!user.isModified('password')) {  //if user does not make any changes to password, run next() 
		return next();
	}
	bcrypt.genSalt(12, function(err, salt) {  //when the user is changing their password, use bcrypt to has the new password  //higher # is a stronger enctryption
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {  //get salt from callback function above
			user.password = hash;
			return next();
		});
	});
});

schema.methods.comparePassword = function(pass) {  //agurment passed in "password"   //when passing in a callback, the function is asyncronous
	var deferred = q.defer();  //adding the promise function
	bcrypt.compare(pass, this.password, function(err, isMatch) {  //making sure the passwords are matching
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(isMatch);
		}
	});
	return deferred.promise;
};


module.exports = mongoose.model('User', schema);