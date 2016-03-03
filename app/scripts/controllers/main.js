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
.controller('BlogController', ['$scope', '$log', 'Post', function($scope, $log, Post){
	
	$scope.articles = [];

	function initialiseScope(){
		var promise = Post.findAll();
		promise.then(function(items){
			$scope.articles = items;
		},
		function(err){
			$log.log(err);
		});
		
	}

	$scope.createNewArticle = function(){
		var newPost = new Post();
		newPost.created = new Date();
		newPost.modified = new Date(newPost.created);
		$scope.articles.push(newPost);
	};

	$scope.saveArticle = function(article){
		$log.log('article', article);
		// If not saved to the server
		var newRefName = article.save();
		article.fbKey = newRefName;
		article.displayMode='view';

	};
	$scope.deleteArticle = function(article){
		var promise = article.delete();
		promise.then(function(){
			$scope.articles.remove(article);
		},
		function(){

		});
	};

	$scope.editArticle = function(article){
		article.displayMode='edit';
	};

	initialiseScope();
	
}]);