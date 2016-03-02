'use strict';
angular.module('Blog')
.factory('Post', ['Firebase', 'firebaseUrl', function(Firebase, firebaseUrl){
	
	var blogFirebaseRef = new Firebase(firebaseUrl+'/blog');

	// blog post type
	var Post = function(postData){
		if(!postData){
			this.content = '';
			this.created = null;
			this.modified = null;
		}else{
			this.content = postData.content;
			this.created = new Date(postData.created);
			this.modified = new Date(postData.modified);
			this.serverObject = postData; //serverObject is the firebase 
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

	Post.prototype.delete = function(onDelete){
		var self = this;
		self.ref.remove(onDelete);
	};

	return Post;
}]);