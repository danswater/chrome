'use strict';

var http       = require( 'http' );
var express    = require( 'express' );
var path       = require( 'path' );
var fetch      = require( 'request' );
var utils      = require( 'util' );
var bodyParser = require( 'body-parser' );
var app        = express();
var server     = http.createServer( app );

var cache = {};

var root = 'http://api.wunderground.com/api/';

var logger = function logger ( request, response, next ) {
	utils.log( request.body );
};

var proxyWeather = function proxyStaging ( request, response, next ) {
	var params         = request.body;
	var serverResponse = response;

	var url = root + params.apiKey +'/'+ params.type +'/q/'+ params.ext;

	if ( cache.data && url === cache.url ) {
		serverResponse.status( 200 ).send( cache.data );
	} else {
		fetch( url , function ( error, response, body ) {
			if ( !error && response.statusCode == 200 ) {
				var obj = JSON.parse( body );
				if ( !obj.response.error ) {
					//we will cache the response data to save request bandwidth
					cache.data = body;
					cache.url  = url;
				}
				serverResponse.status( 200 ).send( cache.data );
			}
		} );
	}
};

var proxyAutoComplete = function ( request, response, next ) {
	var params         = request.body;
	var serverResponse = response;

	var root = 'http://autocomplete.wunderground.com/';
	var url  = root + 'aq?query=' + params.query;

	if ( params.query ) {
		fetch( url, function ( error, response, body ) {
			if ( !error && response.statusCode == 200 ) {
				serverResponse.status( 200 ).send( body );
			}
		} );
	}
};

var allowCors = function allowCors ( request, response, next ) {
	response.header( 'Access-Control-Allow-Origin', '*' );
	response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	next();
};

app.use( allowCors );

app.use( bodyParser.json() );

app.use( logger );

app.use( '/api', proxyWeather );

app.post( '/autocomplete', proxyAutoComplete );

server.listen( '3000', function () {
	utils.log( 'Server is running at port 3000' );
} );