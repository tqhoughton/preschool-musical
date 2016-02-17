var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    session = require("express-session"),
    posts = require("./controllers/postCtrl"),
    users = require("./controllers/userCtrl"),
    albums = require("./controllers/albumCtrl"),
    secret = require("./config/hash");

var app = express();

app.use(express.static(__dirname + '/../public/'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(session({secret: secret.secret}));
app.use(passport.initialize());
app.use(passport.session());



//get mongodb set up
var mongo_uri = "mongodb://localhost:27017";
mongoose.connect(mongo_uri);
mongoose.connection.once("open", function() {
    console.log("connected to mongodb!");
})

var forceAuth = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send();
    }
}

var forceAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
        next();
    } else {
        res.status(401).send();
    }
}

//REST methods for posts
app.get("/api/posts", forceAuth, posts.read);
app.post("/api/posts", forceAdmin, posts.create);
app.put("/api/posts/:id", forceAdmin, posts.update);
app.delete("/api/posts/:id", forceAdmin, posts.delete);

//REST methods for users
app.get("/api/getUser", users.getUser);
app.post("/api/login", passport.authenticate("local"), users.successRedirect);
app.get("/api/logout", users.logout);
app.get("/api/users", users.read);
app.post("/api/register", users.verifySecretWord, users.create);
app.put("/api/users/:id", users.update);
app.delete("/api/users/:id", users.delete);

//REST methods for albums
app.put("/api/removeFromS3", albums.removeMultipleFromS3);
app.post("/api/upload", albums.upload);
app.get("/api/albums", /*forceAuth,*/ albums.readAll);
app.get("/api/albums/:id", forceAuth, albums.readOne)
app.post("/api/albums", forceAdmin, albums.create);
app.delete("/api/albums/:id", /*forceAdmin,*/ albums.delete);
app.put("/api/albums/:id", forceAdmin, albums.addPic);
app.put("/api/albums/:id/:picId", forceAdmin, albums.removeFromS3, albums.deletePic);


app.listen(secret.port, function() {
    console.log("listening on port " + secret.port);
})
