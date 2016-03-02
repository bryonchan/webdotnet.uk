'use strict';
describe('firebaseService', function(){
	var Post, $timeout;
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
		
		inject(function(_Post_, _$timeout_){
			$timeout = _$timeout_;
			Post = _Post_;
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
		it('should call remove', function(){
			var post = new Post();
			post.save();
			spyOn(post.ref, 'remove');
			post.delete();
			expect(post.ref.remove).toHaveBeenCalled();
		});
	});

	describe('findAll', function(){
		it('should return list of items', function(){
			Post.findAll();

			// post.save();
			// spyOn(post.ref, 'remove');
			// post.delete();
			// expect(post.ref.remove).toHaveBeenCalled();
		});
	});

	// function stubRef() {
	// 	return new MockFirebase('Mock://').child('data').child(DEFAULT_ID);
	// }

	// function makeObject(initialData, ref) {
	//     if( !ref ) {
	//       ref = stubRef();
	//     }
	//     var obj = new Post();//$firebaseObject(ref);
	//     if (angular.isDefined(initialData)) {
	//       ref.ref().set(initialData);
	//       ref.flush();
	//       //$timeout.flush();
	//     }
	//     return obj;
	//   }
});