angular.module("pmApp").controller("bulletinCtrl", function($scope, postService, currentUser) {
    $(document).ready(function() {
        $('.modal-trigger').leanModal();
    });
    
    $scope.newPost = {};
    $scope.currentPost = {};
    
    $scope.openCreateModal = function() {
        $('#createModal').openModal();
    }
    
    $scope.openDeleteModal = function(post) {
        $('#deleteModal').openModal();
        $scope.postToDelete = post._id;
    }
    
    $scope.openEditModal = function(post) {
        angular.copy(post, $scope.currentPost);
        
        $('#editModal').openModal();
    }
    
    $scope.toggleOptions = false;
    
    postService.getPosts().then(function(res) {
        $scope.posts = res;
    })
    
    $scope.deletePost = function(postId) {
        //send the postId to the service
        postService.deletePost(postId);
        
        //take the element out of the view
        var pos = $scope.posts.map(function(x) {return x._id}).indexOf(postId);
        $scope.posts.splice(pos, 1);
    }

    var author = currentUser.firstName;
    
    $scope.submitNewPost = function(post) {
        post.author = author;
        postService.submitPost(post).then(function(res) {
            $scope.posts.push(res);
        })
    }
    
    $scope.submitEditedPost = function(post) {
        postService.editPost(post).then(function(res) {
            var pos = $scope.posts.map(function(x) {return x._id}).indexOf(post._id);
            console.log("result: ", res, "position: ", pos);
            $scope.posts[pos] = res;
        })
    }
    
})