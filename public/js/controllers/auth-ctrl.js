angular.module('CoachApp').controller('AuthController', function($scope, $location, AuthService) {
	$scope.profile = profile;
	$scope.state = 'login';
	$scope.clickLogin = function() {
		AuthService.login($scope.email, $scope.password);

		// .then(function() {
		// 	$location.path('/players');
		// }).catch(function(err) {
		// 	$scope.loginError = true;
		// });
	};

	$scope.user = AuthService.returnUser();

    $scope.$on('updateUser', function() {
    $scope.user = AuthService.returnUser();
        // console.log($scope.user)
    });
	$scope.clickRegister = function() {
		AuthService.register($scope.email, $scope.password).then(function() {
			swal("You successfully registered!", "Now, please log in.", "success")
			$scope.state = 'login';
			$scope.registerSuccessful = true;
		}).catch(function(err) {
			swal("Oops...", "Something went wrong!", "error");
			$scope.regError = true;
		});
		$scope.email='';
		$scope.password = '';
	};
	$scope.changeState = function(newState) {
		$scope.loginError = false;
		$scope.regError = false;
		$scope.state = newState;
	};

});