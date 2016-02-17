angular.module("pmApp").controller("picIdCtrl", function($state, $scope, currentUser, pictureService) {
    
    var count = 0;
    var picsLength = 0;
    var shouldGet = false;
    var newPicsForScope = [];
    
    pictureService.getAlbum($state.params.albumId).then(function(res) {
        $scope.album = res;
    })
    
    $(document).ready(function() {
        $('.modal-trigger').leanModal();
    });
    
    $scope.openAddModal = function() {
        $('#addModal').openModal();
    }
    
    $scope.openDeleteModal = function(image) {
        $scope.currentImage = image;
        $('#deleteModal').openModal();
    }
    
    $('#files').on("upload", function(event) {
        picsLength = event.target.files.length;
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
                count++;
                if (count >= picsLength) {
                    pictureService.getAlbum($state.params.albumId).then(function(res) {
                        $scope.album = res;
                    })
                }
                console.log('uploaded: ', data);
            }).catch(function(err) {
                console.error('upload err: ',err);
            });
            
        };
        
        fileReader.readAsDataURL(file);
    }
    
    $scope.uploadPics = function() {
        $('#files').trigger('upload');
        
        //create an array of pictures
        var newPics = [];
        
        var files = $('#files')[0].files;
        for (var f in files) {
            if (typeof files[f] === "object") {
                //create a new picture object
                var newPic = {
                    url: currentUser.email + files[f].name
                };
                newPics.push(newPic);
            }
        }
        //alright, so now we have an array of pictures that we want to add to the album
        for (var i = 0; i < newPics.length; i++) {
            pictureService.postPic(newPics[i], $state.params.albumId).then(function(res) {
                /*if (shouldGet) {
                    $scope.album.pics.push(res);
                    count = 0;
                    picsLength = 0;
                    shouldGet = false;
                    newPicsForScope = [];
                } else {
                    newPicsForScope.push(res);
                    if (i === newPics.length - 1) {
                        shouldGet = !shouldGet;
                    }
                }*/
            })
        }
        
    }
    
    $scope.deletePic = function(image) {
        pictureService.deletePic($state.params.albumId, image._id, image.url);
        //take the element out of the view
        var pos = $scope.album.pics.map(function(x) {return x._id}).indexOf(image._id);
        $scope.album.pics.splice(pos, 1);
    }
    
})