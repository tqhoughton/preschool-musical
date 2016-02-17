var User = require("./../models/User");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var secretWords = require("./../config/secretWords");

passport.use(new LocalStrategy({
    usernameField: "email"
},
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { 
          console.log('Error hit: ', err)
          return done(err); }
      if (!user) { 
          console.log('No user: ', user)
          return done(null, false); }
      if (!user.validPassword(password)) { 
          console.log ('wrong password')
          return done(null, false); }
      delete user.password;
    console.log('match')
      return done(null, user);
    });
  }
));

//Serialization
passport.serializeUser(function(user, done) {
    console.log('serializing')
    var newUser = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    }
    done(null, newUser);
})
passport.deserializeUser(function(obj, done) {
    console.log('deserializing')
    done(null, obj);
})

module.exports = {
    
    verifySecretWord: function(req, res, next) {
        console.log("hitting verify endpoint with data: ", req.body);
        if (req.body.secretWord === secretWords.user) {
            delete req.body.secretWord;
            req.body.role = "user";
            next();
        } else if (req.body.secretWord === secretWords.admin) {
            delete req.body.secretWord;
            req.body.role = "admin";
            next();
        } else {
            res.status(403).send("Your secret word was incorrect.")
        }
    },
    
    read: function(req, res, next) {
        User.find({/*PUT IN HERE*/}, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    create: function(req, res, next) {
        var newUser = new User(req.body);
        
        newUser.save(function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send("successful user creation");
            }
        })
    },
    
    update: function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    delete: function(req, res, next) {
        User.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    logout: function(req, res, next) {
        console.log('logout')
        req.logout();
        res.send();
    },
    
    successRedirect: function(req, res, next) {
        //will only call if successful
        console.log('success function')
        var newUser = {
            _id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            role: req.user.role
        }
        res.send(newUser);
    },
    
    getUser: function(req, res) {
        //check if authenticated
        
            //check if the current user has admin privileges
        if (req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send("notAuth");
        }
    }
}