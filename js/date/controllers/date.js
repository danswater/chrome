( function ( angular ) {

	function SettingsController ( $scope, UserService, Weather ) {
		$scope.user = UserService.user;

		$scope.save = function save() {
			UserService.save();
		};

		$scope.fetchCities = Weather.getCityDetails;
	}

	function MainController ( $scope, $timeout, Weather, UserService ) {
		// Build the date and weather object
		$scope.date    = {};
		$scope.weather = {};

		// Update function
		var updateTime = function () {
			$scope.date.raw = new Date();
			$timeout( updateTime, 1000 );
		};

		$scope.user    = UserService.user;
		$scope.setName = UserService.setName;

		// Weather forecast function
		Weather.getWeatherForecast( $scope.user.location )
		.then( function ( data ) {
			$scope.weather.forecast = data;
		} );

		// Kick off the update function
		updateTime();

	}

	angular.module( 'presently.date.controllers.date', [
	] )

	.controller( 'SettingsController', SettingsController )

	.controller( 'MainController', MainController );

} )( window.angular );