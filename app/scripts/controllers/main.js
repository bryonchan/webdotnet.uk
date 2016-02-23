'use strict';

/**
 * @ngdoc function
 * @name webdotnetukApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webdotnetukApp
 */
angular.module('webdotnetukApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });


angular.module('webdotnetukApp')
.controller('BlogController', ['$scope', function($scope){
	$scope.articles = 
	[
		{id: 1, content:'Blog Content'}, 
		{id: 1, content:'Blog Content 2'}
	];
}]);