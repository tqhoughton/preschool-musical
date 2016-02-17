var AlbumModel = require("./../models/Album");
var mongoose = require("mongoose");
var aws = require("aws-sdk");
var keys = require("./../config/keys")

var bucketName = "preschoolmusical";

aws.config.update({
    accessKeyId: keys.key,//insert here
    secretAccessKey: keys.secret,//insert here
    region: "us-west-2"
})

var s3 = new aws.S3();

module.exports = {
    readAll: function(req, res, next) {
        var query = {};
        if (req.query.tag) {
            query = {tags: req.query.tag};
        }
        AlbumModel.find(query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    readOne: function(req, res, next) {
        AlbumModel.findById(req.params.id, function(err, album) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(album);
            }
        })
    },
    
    create: function(req, res, next) {
        AlbumModel.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
        
    delete: function(req, res, next) {
        AlbumModel.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    addPic: function(req, res, next) {
        AlbumModel.findById(req.params.id, function(err, album) {
            if (err) {
                res.status(500).send(err);
            } else {
                album.pics.push(req.body);
                album.save();
                res.send(album.pics[album.pics.length - 1]);
            }
        })
    },
    
    deletePic: function(req, res, next) {
        AlbumModel.findById(req.params.id, function(err, album) {
            if (err) {
                res.status(500).send(err);
            } else {
                //we are currently in the album, we need to find the picture object with the picId
                console.log("pics: ", album.pics);
                var pos = album.pics.map(function(x) {console.log(x._id.toString()); return x._id.toString();}).indexOf(req.params.picId);
                console.log('deleting picture ', pos);
                var deleted = album.pics.splice(pos, 1);
                album.save();
                res.send(deleted);
            }
        })
    },
    
    upload: function(req, res, next) {
        console.log(req.body.fileName);
        var buf = new Buffer(req.body.fileBody.replace(/^data:image\/\w+;base64,/,""), "base64");
        
        var params = {
            Bucket: bucketName,
            Key: req.body.fileName,
            Body: buf,
            ContentType: "image/" + req.body.fileName.substring(req.body.fileName.lastIndexOf(".")),
        }
        
        s3.upload(params, function(err, data) {
            if (err) {
                console.error(err);
                return res.send(err);
            } else {
                console.log("upload successful!");
                return res.send(data);
            }
        })
    },
    
    removeFromS3: function(req, res, next) {
        console.log("request body: ", req.body);
        console.log(req.body.key);
        var params = {
            Bucket: bucketName,
            Key: req.body.key
        }
        
        s3.deleteObject(params, function(err, data) {
            if (err) {
                console.error(err);
                res.send(err);
            } else {
            }
            
            next();
        })
    },
    
    removeMultipleFromS3: function(req, res, next) {
        for (var i = 0; i < req.body.keys.length; i++) {
            var currentKey = req.body.keys[i];
            var params = {
                Bucket: bucketName,
                Key: currentKey
            };
            
            s3.deleteObject(params, function(err, data) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                }
            })
        }
    }
    
}