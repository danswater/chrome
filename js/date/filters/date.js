( function ( angular ) {

	function getPeriod () {
		return function ( input ) {
			var now  = input;
			var hour = now.getHours();

			var period;
			if ( hour >= 3 && hour < 12 ) {
				period = 'morning';
			}

			if ( hour >=12 && hour < 17 ) {
				period = 'afternoon';
			}

			if ( hour >=17 || hour < 3 ) {
				period = 'evening';
			}

			return period;
		};
	}

	angular.module( 'presently.date.filters.date', [
	] )

	.filter( 'getPeriod', getPeriod );

} )( window.angular );