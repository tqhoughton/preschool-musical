var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    author: {type: String},
    title: {type: String, required: true},
    text: {type: String, required: true},
    created: {type: Date},
    lastModified: {type: Date},
    tags: {type: Array, enum: [["mwf"], ["tth"], ["mwf", "tth"]], default: ["mwf", "tth"]}
})

module.exports = mongoose.model("Post", postSchema);