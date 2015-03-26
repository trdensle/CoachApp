var app = angular.module('CoachApp', ['ngRoute']);  //LocalStorageModule

app.config(function($routeProvider) {
	$routeProvider
	.when('/players', {
		templateUrl: '../templates/players.html',
		controller: 'playersController',
		resolve: {
			players: function(playersService) {
				return playersService.getPlayers();
			}
		}
	})
	.when('/profile', {
		templateUrl: '../templates/coach.html',
		controller: 'playersController',
		resolve: {
			players: function(playersService) {
				return playersService.getPlayers();
			}
		}
	})
	// .when('/profile', {
	// 	templateUrl: '../templates/coach.html',
	// 	controller: 'profileController',
	// 	resolve: {
	// 		profile: function(profileService) {
	// 			return profileService.getPlayers();
	// 		}
	// 	}
	// })
	.when('/auth', {
		templateUrl: '../templates/auth.html',
		controller: 'AuthController'
	})
	.otherwise({
		redirectTo: '/auth'
	});
});

// app.config(function(localStorageServiceProvider) {
//   localStorageServiceProvider
//     .setPrefix("CoachApp")
//     .setStorageType("sessionStorage")
//     .setNotify(true, true)
// });