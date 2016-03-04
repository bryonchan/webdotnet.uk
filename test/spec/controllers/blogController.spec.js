'use strict';
describe('BlogController', function(){
	var $controller, postMock, $q, $timeout;
	var $rootScope;
	
	beforeEach(function(){
		module('webdotnetukApp');
		module('Blog');
		inject(function(_$controller_, _$q_, _$timeout_, _$rootScope_){
			$q = _$q_;
			$timeout = _$timeout_;
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			postMock = {
				findAll: function(){
					var def = $q.defer();
					def.resolve([{content: 'Lots of words'}]);
					return def.promise;
				}
			};	
		});
		
	});
	describe('delete button', function(){
		it('should remove post from list of articles', function(){
			var scope = $rootScope.$new();
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
	describe('save button', function(){
		it('should be hidden on load', function(){
			var scope = $rootScope.$new();
			$controller('BlogController', {$scope: scope, Post: postMock});
			$timeout.flush();
			expect(scope.articles[0].displayMode).toEqual('view');
		});
	});
	describe('edit button', function(){
		it('should be hidden in edit mode', function(){
			var scope = $rootScope.$new();
			$controller('BlogController', {$scope: scope, Post: postMock});
			$timeout.flush();
			scope.editArticle(scope.articles[0]);
			expect(scope.articles[0].displayMode).toEqual('edit');
		});
	});
});