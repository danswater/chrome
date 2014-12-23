( function ( angular ) {

	function UserService ( localStorageService ) {
		var defaults = {
			'location' : null,
			'name'     : localStorageService.get( 'name' ) || 'awesome'
		};

		var service = {
			'user' : defaults,

			'save' : function () {
				sessionStorage.presently = angular.toJson( service.user );
			},

			'restore' : function () {
				service.user = angular.fromJson( sessionStorage.presently ) || defaults;
				return service.user;
			},

			'setName' : function ( name ) {
				localStorageService.set( 'name', name );
			}
		};

		service.restore();
		return service;
	}

	angular.module( 'presently.date.services.user', [
	])

	.factory( 'UserService', UserService );

} )( window.angular );