( function ( angular ) {

	function autoFill ( $timeout ) {
		return {
			'restrict' : 'EA',
			'scope'    : {
				'autoFill' : '&',
				'ngModel'  : '='
			},
			'compile' : function ( tEle, tAttrs ) {
				// Our compile function
				var tplEl = angular.element( '<div class="typehead">' +
					'<input type="text" autocomplete="off" placeholder="Location" />' +
					'<ul id="autolist" ng-show="reslist">' +
						'<li ng-repeat="res in reslist">{{ res.name }}</li>' +
					'</ul>' +
				'</div>' );

				var input = tplEl.find( 'input' );
				input.attr( 'type', tAttrs.type );
				input.attr( 'ng-model', tAttrs.ngModel );
				tEle.replaceWith( tplEl );

				return function ( scope, ele, attrs, ctrl ) {
					var minKeyCount = attrs.minKeyCount || 3;
					var timer;
					var input = ele.find( 'input' );

					input.bind( 'keyup', function ( e ) {
						var val = ele.val();
						if ( val.length  < minKeyCount ) {
							if ( timer ) {
								$timeout.cancel( timer );
							}
							scope.reslist = null;
							return;
						} else {
							if ( timer ) {
								$timeout.cancel( timer );
							}
							timer = $timeout( function () {
								scope.autoFill()( val )
								.then( function( data ) {
									if ( data && data.length > 0 ) {
										scope.reslist = data;
										scope.ngModel = data[ 0 ].zmw;
									}
								} );
							}, 300 );
						}
					} );

					input.bind( 'blur', function ( e ) {
						scope.reslist = null;
						scope.$digest();
					} );
				};
			}
		};
	}

	function editable () {
		return {
			'restrict' : 'EA',
			'scope' : {
				'editable' : '&',
				'ngModel'  : '='
			},
			'link' : function ( scope, ele, attrs, ctrl ) {
				ele.bind( 'dblclick', function ( e ) {
					ele.attr( 'contenteditable', true );
				} );

				ele.bind( 'blur', function ( e ) {
					var name = ele.text();
					scope.editable()( name );
					ele.attr( 'contenteditable', false );
				} );
			}
		};
	}

	angular.module( 'presently.date.directives.date', [
	] )

	.directive( 'autoFill', autoFill )

	.directive( 'editable', editable );

} )( window.angular );