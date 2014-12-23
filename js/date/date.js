( function ( angular ) {

	angular.module( 'presently.date', [
		'ngRoute',
		'presently.date.filters.date',
		'presently.date.directives.date',
		'presently.date.services.user',
		'presently.date.services.weather',
		'presently.date.controllers.date'
	] )

	.config( function ( WeatherProvider ) {
		WeatherProvider.setApiKey( 'a1cc457ff0e08354' );
	} )

	.config( function ( $routeProvider ) {
		$routeProvider
			.when( '/', {
				'templateUrl' : 'templates/home.html',
				'controller'  : 'MainController'
			} )

			.when( '/settings', {
				'templateUrl' : 'templates/settings.html',
				'controller'  : 'SettingsController'
			} )

			.otherwise( {
				'redirectTo' : '/'
			} );
	} );

} )( window.angular );