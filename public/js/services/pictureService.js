angular.module("pmApp").service("pictureService", function($http) {
    
    this.getAlbums = function(query) {
        return $http({
            url: "/api/albums",
            method: "GET",
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.getAlbum = function(id) {
        return $http({
            url: "/api/albums/" + id,
            method: "GET",
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.postAlbum = function(data) {
        return $http({
            url: "/api/albums",
            method: "POST",
            data: data
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.postPic = function(data, url) {
        return $http({
            url: "/api/albums/" + url,
            method: "PUT",
            data: data
        }).then(function(res) {
            return res.data;
        })
    }
    
    this.deletePic = function(albumId, picId, picKey) {
        console.log(picKey);
        return $http({
            url: "/api/albums/" + albumId + "/" + picId,
            method: "PUT",
            data: {key: picKey}
        }).then(function(res) {
            console.log(res);
        })
    }
    
    this.deleteAlbum = function(albumId) {
        return $http({
            url: "/api/albums/" + albumId,
            method: "DELETE"
        }).then(function(res) {
            console.log(res);
        })
    }
    
    this.startUpload = function(event) {
        console.log('File: ', event.target.files);
        
        for (var f in event.target.files) {
            console.log(event.target.files[f]);
            if (typeof event.target.files[f] === "object") {
                uploadFile(event.target.files[f]);
            }
        }
    }
    
    this.uploadToS3 = function(file) {
        return $http({
            method: "POST",
            url: "/api/upload",
            data: file
        })
    }
    
    this.removeFromS3 = function(keys) {
        return $http({
            method: "PUT",
            url: "/api/removeFromS3",
            data: {keys: keys}
        })
    }
})