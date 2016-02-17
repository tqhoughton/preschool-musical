var mongoose = require("mongoose");

var pictureSchema = new mongoose.Schema({
    url: {type: String, required: true},
    name: {type: String},
    uploaded: {type: Date}
})

module.exports = pictureSchema;