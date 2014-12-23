( function ( angular ) {

	function WeatherService () {
		var apiKey = '';

		this.setApiKey = function ( key ) {
			if ( key ) {
				this.apiKey = key;
			}
		};

		this.getParams = function ( type, ext ) {
			return {
				'apiKey' : this.apiKey,
				'type'   : type,
				'ext'    : ext + '.json'
			};
		};

		this.$get = function ( $q, $http ) {
			var self = this;
			// Return service object
			return {
				'getWeatherForecast' : function ( city ) {
					var d = $q.defer();

					$http( {
						'method' : 'post',
						'url'    : 'http://localhost:3000/api',
						'data'   : self.getParams( 'forecast', city ),
						'cache'  : true
					} )
					.success( function ( data ) {
						// the wunderground API returns the
						// object that nests the forecasts inside
						// the forecast.simpleforecast key
						d.resolve( data.forecast.simpleforecast );
					} )
					.error( function ( data ) {
						d.reject( data );
					} );

					return d.promise;
				},

				'getCityDetails' : function ( query ) {
					var d = $q.defer();

					var data = { 'query' : query };

					$http( {
						'method' : 'post',
						'url' : 'http://localhost:3000/autocomplete',
						'data' :data
					} )
					.success( function ( data ) {
						d.resolve( data.RESULTS );
					} )
					.error( function ( data ) {
						return d.reject( data );
					} );

					return d.promise;
				}
			};
		};
	}

	angular.module( 'presently.date.services.weather', [
	] )

	.provider( 'Weather', WeatherService );

} )( window.angular );