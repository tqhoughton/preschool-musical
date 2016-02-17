angular.module("pmApp").service("postService", function($http) {
    
    this.getPosts = function() {
        return $http({
            url: "/api/posts",
            method: "GET",
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.deletePost = function(id) {
        return $http({
            url: "/api/posts/" + id,
            method: "DELETE"
        }).then(function(res) {
            console.log(res.data);
        })
    }
    
    this.submitPost = function(post) {
        if (post.created) {
            post.lastModified = new Date();
        } else {
            post.created = new Date();
            post.lastModified = post.created;
        }
        
        console.log("post data: ", post);
        
        return $http({
            url: "/api/posts",
            method: "POST",
            data: post
        }).then(function(res) {
            console.log(res.data);
            return res.data;
        })
    }
    
    this.editPost = function(post) {
        post.lastModified = new Date();
        
        return $http({
            url: "/api/posts/" + post._id,
            method: "PUT",
            data: post
        }).then(function(res) {
            console.log(res.data);
            return res.data;
        })
    }
})