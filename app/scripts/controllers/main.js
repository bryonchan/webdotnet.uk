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
	
	// var fireBaseUrl = 'https://glaring-inferno-2473.firebaseio.com';
	// var blogFirebaseRef = new Firebase(fireBaseUrl+'/blog');
	
	$scope.articles = [];

	// blogFirebaseRef.once('value', function(snapshot){
	// 	var posts = snapshot.val() || {};
	// 	var tmpArray = [];
	// 	for(var postKey in posts){
	// 		var post = new Post(posts[postKey]);
	// 		post.fbKey = postKey;
	// 		tmpArray.push(post);
	// 	}
			
	// 	$scope.$apply(function(){
	// 		$scope.articles = tmpArray;
	// 	});		
	// });

	function initialiseScope(){
		var promise = Post.findAll();
		promise.then(function(items){
			$scope.$apply(function(){
				$scope.articles = items;
			});
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
		//$scope.articles.remove(article);
		article.delete(function(){
			$scope.$apply(function(){
				$scope.articles.remove(article);
			});
		});
	};

	$scope.editArticle = function(article){
		article.displayMode='edit';
	};

	initialiseScope();
	
}]);