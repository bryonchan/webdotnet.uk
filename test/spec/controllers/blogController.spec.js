'use strict';
describe('BlogController', function(){
	var $controller, postMock, $q, $timeout;

	
	beforeEach(function(){
		module('webdotnetukApp');
		module('Blog');
		inject(function(_$controller_, _$q_, _$timeout_){
			$q = _$q_;
			$timeout = _$timeout_;
			$controller = _$controller_;
			//var deferredLogin = $q.defer();
			postMock = {
				findAll: jasmine.createSpy('findAll').and.returnValue($q.defer().promise)
			};	
		});
		
	});
	describe('delete button', function(){
		it('should remove post from list of articles', function(){
			var scope = {};
			var deferred = $q.defer();
			var article = {
				content: 'some words',
				delete: jasmine.createSpy('delete').and.returnValue(deferred.promise)
			};
			
			$controller('BlogController', {$scope: scope, Post: postMock});
			scope.articles = [article];
			expect(scope.articles.length).toEqual(1);
			scope.deleteArticle(article);
			deferred.resolve();
			$timeout.flush();
			expect(scope.articles.length).toEqual(0);
		});
	});
});