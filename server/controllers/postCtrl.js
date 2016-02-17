var PostModel = require("./../models/Post");
var mongoose = require("mongoose");


module.exports = {
    read: function(req, res, next) {
        var query = {};
        if (req.query.tag){
            query = {tags:req.query.tag};
        }
        PostModel.find(query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    create: function(req, res, next) {
        PostModel.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    update: function(req, res, next) {
        PostModel.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                PostModel.findById(req.params.id, function(err, newPost) {
                    res.send(newPost);
                })
            }
        })
    },
    
    delete: function(req, res, next) {
        PostModel.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    }
}