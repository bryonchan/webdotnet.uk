'use strict';
angular.module('Blog')
.factory('Post', ['Firebase', 'firebaseUrl', '$q', function(Firebase, firebaseUrl, $q){
	
	var blogFirebaseRef = new Firebase(firebaseUrl+'/blog');

	// blog post type
	var Post = function(postDataOrSnapshot){
		var self = this;
		if(postDataOrSnapshot){
			if(postDataOrSnapshot.ref && postDataOrSnapshot.val){
				var postData = postDataOrSnapshot.val();
				instantiate(postData);
				this.ref = postDataOrSnapshot.ref();
			}else{
				instantiate(postDataOrSnapshot);
			}
		}
		else{
			this.content = '';
			this.created = null;
			this.modified = null;
		}

		function instantiate(postData){
			self.content = postData.content;
			self.created = new Date(postData.created);
			self.modified = new Date(postData.modified);
		}
	};

	Post.prototype.save = function(){
		var self = this;
		if(!self.ref){ //new
			self.ref = blogFirebaseRef.push();
		}

		var postServerObject = {
		    created: this.created ? this.created.getTime() : null,
		    modified: this.modified ? this.modified.getTime() : null,
		    content: this.content
		};
		//var newPost = lodash.pick(this, ['content', 'created', 'modified', 'postId']);
		self.ref.set(postServerObject);
		
		return self.ref.key();
	};

	Post.prototype.delete = function(){
		var self = this;
		var deferred = $q.defer();
		if(self.ref){
			self.ref.remove(function(){
				deferred.resolve();
			});
		}else{
			deferred.resolve();
		}

		return deferred.promise;
		
	};

	Post.findAll = function(){
		var deferred = $q.defer();
		blogFirebaseRef.once('value', function(snapshot){
			var tmpArray = [];
			snapshot.forEach(function(data){
				var post = new Post(data);
				tmpArray.push(post);
			});
				
			deferred.resolve(tmpArray);	
		});
		return deferred.promise;
	};

	Post.getRef = function(){
		return blogFirebaseRef;
	};

	return Post;
}]);