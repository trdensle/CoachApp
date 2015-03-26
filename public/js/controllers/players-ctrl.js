angular.module('CoachApp').controller('playersController', function($scope, playersService, players, $timeout) {

	$scope.logout = function(){
	  AuthService.logout();
	};

	$scope.players = players;

	$scope.savePlayer = function(player) {
		playersService.save(player);
	};
	
	$scope.createPlayer = function() {
		playersService.add({
			title: $scope.newPlayer   
		}).then(function(player) {
			$scope.players.push(player);  
			$scope.newPlayer = null;
		})
	};

	$scope.removePlayer = function(player){
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this billboard!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm){   
            if (isConfirm) {
                players.removePlayer(player)
                    .then(function(res){
                        $rootScope.updateBoards();
            })
                swal("Deleted!", "Your billboard has been deleted.", "success");
            } else {
                swal("Cancelled", "Your billboard is safe :)", "error");
            }
        });
    };      
});

	//timer directive
	//http://embed.plnkr.co/UVzM2QRWHoZxFeg6jkPG/preview

	angular.module('CoachApp').directive('timer', function($timeout, $rootScope){

		return {
			      restrict: 'E',
			      transclude: true,
			      scope: {},

		    controller: function($scope, $element, $rootScope) {
			        var timeoutId;
			        $scope.seconds = 0;
			        $scope.minutes = 0;
			        $scope.running = false;
		 
		        $scope.stop = function() {
			        $timeout.cancel(timeoutId);
			        $scope.running = false;
		        };
		        
		        $scope.start = function() {
		          timer();
		          $scope.running = true;
		        };
		        
		        $scope.clear = function() {
		          $scope.seconds = 0;
		          $scope.minutes = 0;
		        };
		        
		        var timer = function() {
		          timeoutId = $timeout(function() {
		            updateTime(); // update Model
		            timer();
		           }, 1000);
	        	}
	        
		        var updateTime = function() {
		          $scope.seconds++;
		          if ($scope.seconds === 60) {
		            $scope.seconds = 0;
		            $scope.minutes++;
		          }
		        }
	        },
	      	template:
	        '<div class="blueborder">' +
		        '<div><h2>{{minutes|numberpad:2}}:{{seconds|numberpad:2}}</h2></div><br/>' +
		        '<input type="button" ng-model="startButton" class="btn-success" ng-click="start()" ng-disabled="running" value="START" />' +
		        '<input type="button" ng-model="stopButton" class="btn-danger" ng-click="stop()" ng-disabled="!running" value="STOP" />' +
		        '<input type="button" ng-model="clearButton" class="btn-info" ng-click="clear()" ng-disabled="running" value="CLEAR" />' +
	        '</div>',
      		replace: true
       	};
    }).

    filter('numberpad', function() {
	    return function(input, places) {
	      var out = "";
	      if (places) {
	        var placesLength = parseInt(places, 10);
	        var inputLength = input.toString().length;
	      
	        for (var i = 0; i < (placesLength - inputLength); i++) {
	          out = '0' + out;
	        }
	        out = out + input;
	      }
	      return out;
	    };
	});