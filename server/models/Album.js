var mongoose = require("mongoose");
var pictureSchema = require("./Picture")

var albumSchema = new mongoose.Schema({
    name: {type: String},
    pics: [pictureSchema],
    tags: {type: Array, enum: [["mwf"], ["tth"], ["mwf", "tth"]]}
})

module.exports = mongoose.model("Album", albumSchema);