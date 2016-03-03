'use strict';
describe('firebaseService', function(){
	var Post, $timeout, testutils;
	var MockFirebase = window.MockFirebase;
	//var DEFAULT_ID = 'REC1';
	// var FIXTURE_DATA = {
	// 	aString: 'alpha',
	// 	aNumber: 1,
	// 	aBoolean: false,
	// 	anObject: { bString: 'bravo' }
	// };

	beforeEach(function(){
		
		module('Blog', function($provide){
			$provide.value('Firebase', MockFirebase);
		});
		module('testutils');
		inject(function(_Post_, _$timeout_, _testutils_){
			$timeout = _$timeout_;
			Post = _Post_;
			testutils = _testutils_;
			//obj = makeObject(FIXTURE_DATA);
		});
		
	});

	describe('constructor', function(){
		it('should set content', function(){
			var post = new Post({content:'Hello'});
			expect(post.content).toEqual('Hello');
		});
		it('should set content #2', function(){
			var post = new Post();
			post.content = 'Hello';
			expect(post.content).toEqual('Hello');
		});
		it('should accept a Datasnapshot', function(){
			var data = {content: 'Hello'};
			var snapshot = testutils.snap(data);
			var post = new Post(snapshot);
			
			expect(post.content).toEqual('Hello');
		});
	});

	describe('save a new Post', function(){
		it('should create a server object', function(){
			var post = new Post();
			post.save();
			expect(post.ref).not.toBeNull();
			expect(post.ref.key()).not.toBeNull();
		});
	});

	describe('save an existing Post', function(){
		it('should update a server object', function(){
			var post = new Post();
			post.save();
			post.content = 'Test';
			expect(post.content).toEqual('Test');
		});
	});

	describe('delete an existing Post', function(){
		it('should return a promise', function () {
	      var post = new Post();
	      expect(post.delete()).toBeAPromise();
	    });
		it('should call remove', function(){
			var post = new Post();
			post.save();
			spyOn(post.ref, 'remove');
			post.delete();
			expect(post.ref.remove).toHaveBeenCalled();
		});

		it('should call resolve', function(){
			var resolved = jasmine.createSpy('resolve');
			var rejected = jasmine.createSpy('reject');
			var post = new Post();
			post.save();
			var promise = post.delete();
			promise.then(resolved, rejected);
			post.ref.flush();
			$timeout.flush(); //not sure why this is needed
			expect(resolved).toHaveBeenCalled();
		});

		it('should remove an unsaved post', function(){
			var resolved = jasmine.createSpy('resolve');
			var rejected = jasmine.createSpy('reject');
			var post = new Post();
			var promise = post.delete();
			promise.then(resolved, rejected);
			$timeout.flush(); //not sure why this is needed
			expect(resolved).toHaveBeenCalled();
		});
	});

	describe('findAll', function(){
		it('should return a promise', function () {
	      expect(Post.findAll()).toBeAPromise();
	    });
		it('should return list of items', function(){
			var resolved = jasmine.createSpy('resolve');
			var rejected = jasmine.createSpy('reject');
			var ref = Post.getRef();
			ref.push({content: 1});
			var promise = Post.findAll();
			var items;
			promise.then(function(_items){
				items = _items;
				resolved();
			}, rejected);
			ref.flush();
			$timeout.flush(); //not sure why this is needed
			expect(resolved.and.identity()).toEqual('resolve');
			expect(resolved).toHaveBeenCalled();
			expect(rejected).not.toHaveBeenCalled();
			expect(items[0].content).toEqual(1);
		});
		it('should return items with a firebase reference', function(){
			var ref = Post.getRef();
			ref.push({content: 1});
			var promise = Post.findAll();
			var items;
			promise.then(function(_items){
				items = _items;
			});
			ref.flush();
			$timeout.flush(); //not sure why this is needed
			expect(items[0].ref).toBeDefined();
			expect(items[0].ref).not.toBeNull();
		});
	});
});