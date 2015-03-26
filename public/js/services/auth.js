angular.module('CoachApp').service('AuthService', function($q, $http, $location, $rootScope) {
	var user = "";

	this.login = function(email, password) {  //the arguments passed in to test against()
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/auth',
			data: {    //this tests the data we are comparing against when a user logs in
				email: email,
				password: password
			}
		}).then(function(response) {
			$rootScope.$broadcast("updateUser");
			$location.path('/players').replace();
			deferred.resolve(response);
		}).catch(function(err) {
			// console.log("error logging in");
			deferred.reject(err);
		});
		return deferred.promise;
	};


	this.register = function(email, password) {    //in order to register, you need an email and password
		var deferred = $q.defer();    //when passing in a callback, the function is asyncronous
		$http({
			method: 'POST',
			url: '/api/register',
			data: {
				email: email,
				password: password
			}
		}).then(function(response) {
			$location.path('/').replace();
			deferred.resolve(response);
		});
		return deferred.promise;
	};


	this.getProfile = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/profile'
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};

	this.getUser = function() {
		$http.get('/api/currentUser').then(function(res) {
			user = res.data;
			$rootScope.$broadcast('updateUser');
		}) ;
	};
	this.getUser();

	this.returnUser = function() {
		return user;
	};






	 this.logout = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/logout'
		}).then(function(response){
			user = "";
			$rootScope.$broadcast('updateUser');
			$location.path('/').replace();
			deferred.resolve(response);
		});
	};

});