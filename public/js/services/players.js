angular.module('CoachApp').service('playersService', function($q, $http) {
	this.getPlayers = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/players'
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};


	// this.getProfile = function() {
	// 	var deferred = $q.defer();
	// 	$http({
	// 		method: 'GET',
	// 		url: '/api/profile'
	// 	}).then(function(response) {
	// 		deferred.resolve(response.data);
	// 	});
	// 	return deferred.promise;
	// };

    this.removePlayer = function(player){
	    var deferred = $q.defer()
	    console.log(player);
	    $http.delete("/api/removePlayer/" + player.id)
	        .then(function(res){
	            console.log("Player delete: ", res);
	            deferred.resolve(res.data);
	        })
	    return deferred.promise;
    }

    this.updatePlayer = function(player){
        var deferred = $q.defer()
        $http.put("/api/newPlayer", player) //billboard
            .then(function(res){
                console.log("Player was updated: ", res);
                deferred.resolve(res.data);
            })
        return deferred.promise;
    }

	// this.save = function(player) {
	// 	var deferred = $q.defer();
	// 	$http({
	// 		method: 'PUT',
	// 		url: '/api/players/'+player._id,
	// 		data: player
	// 	}).then(function(response) {
	// 		deferred.resolve(response.data);
	// 	});
	// 	return deferred.promise;
	// };
	
	this.add = function(player) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/players',
			data: player
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
});





