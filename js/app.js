( function ( angular ) {
	'use strict';

	angular.module( 'presently', [
		'presently.date',
		'LocalStorageModule'
	] )

	.config( function ( localStorageServiceProvider ) {
		localStorageServiceProvider.setPrefix( 'presently' );
	} );

} )( window.angular );