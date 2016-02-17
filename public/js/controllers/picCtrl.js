angular.module("pmApp").controller("picCtrl", function($scope, pictureService, currentUser, $q) {
    
    var shouldGet = false;
    
    var count = 0;
    var fileLength = 0;
    
    pictureService.getAlbums().then(function(res) {
        $scope.albums = res;
    })
    
    $(document).ready(function() {
        $('.modal-trigger').leanModal();
    });
    
    $scope.openCreateModal = function() {
        $('#createModal').openModal();
    }
    
    $scope.openDeleteModal = function(currentAlbum) {
        $scope.currentAlbum = currentAlbum;
        $('#deleteModal').openModal();
    }
    
    $scope.deleteAlbum = function(album) {
        //first, delete from our API
        pictureService.deleteAlbum(album._id);
        var pos = $scope.albums.map(function(x) {return x._id}).indexOf(album._id);
        $scope.albums.splice(pos, 1);
        //then, delete all of the images in that album from s3
        var keys = [];
        
        for (var i = 0; i < album.pics.length; i++) {
            var newKey = album.pics[i].url;
            keys.push(newKey);
        }
        
        pictureService.removeFromS3(keys);
    }
    
    $scope.uploadAlbum = function() {
        $('#file').trigger('upload');
        
        //create a new Album object
        
        var newAlbum = {
            name: $scope.albumName,
            pics: [],
            created: new Date()
        };
        
        var files = $('#file')[0].files;
        lengthOfFiles = files.length;
        for (var f in files) {
            if (typeof files[f] === "object") {
                //create a new picture object
                var newPic = {
                    url: currentUser.email + files[f].name
                };
                
                newAlbum.pics.push(newPic);
            }
        }
        
        pictureService.postAlbum(newAlbum).then(function(res) {
            count++
            //if uploadToS3 already finished, put the file in the view
            if (shouldGet) {
                $scope.albums.push(res);
                shouldGet = !shouldGet;
            //if it didn't, put the file on the scope so uploadFromS3 can grab it
            } else {
                shouldGet = !shouldGet;
                $scope.newAlbum = res;
            }
        });
    }
    
    $('#file').on("upload", function(event) {
        console.log('File: ', event.target.files);
        fileLength = event.target.files.length;
        for (var f in event.target.files) {
            console.log(event.target.files[f]);
            if (typeof event.target.files[f] === "object") {
                uploadFile(event.target.files[f]);
            }
        }
    });
    
    var uploadFile = function(file) {
        var fileReader = new FileReader();
        
        fileReader.onload = function(loaded) {
            //Once loaded, run this code
            console.log(loaded);
            
            var newFile = {
                fileName: currentUser.email + file.name,
                fileBody: loaded.target.result
            };
            pictureService.uploadToS3(newFile).then(function(data) {
                console.log('uploaded: ', data);
                count++;
                //if album isn't uploaded to database yet:
                if (count >= fileLength) {
                    if (shouldGet) {
                        $scope.albums.push($scope.newAlbum);
                        shouldGet = !shouldGet;
                        fileLength = 0;
                        count = 0;
                    } else {
                        shouldGet = !shouldGet;
                        fileLength = 0;
                        count = 0;
                    }
                }
            }).catch(function(err) {
                console.error('upload err: ',err);
            });
            
        };
        
        fileReader.readAsDataURL(file);
    }
})