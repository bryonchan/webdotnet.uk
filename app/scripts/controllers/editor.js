'use strict';
angular.module('Blog')
.controller('CkeditorController', ['$scope', '$log', function($scope, $log){
	$scope.options = {
	    language: 'en',
	    allowedContent: true,
	    entities: false
	  };
	  $scope.onReady = function(){
	  	$log.log('on ready');
	  };
}]);