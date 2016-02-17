var app = angular.module("pmApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
    .state("Home", {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "mainCtrl"
    })
    .state("About", {
        url: "/about",
        templateUrl: "templates/about.html"
    })
    .state("Contact", {
        url: "/contact",
        templateUrl: "templates/contact.html"
    })
    .state("Log In", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "loginCtrl"
    })
    .state("Register", {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: "registerCtrl"
    })
    .state("Bulletin", {
        url: "/bulletin",
        templateUrl: "templates/bulletin.html",
        controller: "bulletinCtrl",

        resolve: {
            currentUser: function(userService) {
                return userService.getUser(true);
            }
        }
    })
    .state("Pictures", {
        url: "/pictures",
        templateUrl: "templates/pictures.html",
        controller: "picCtrl",

        resolve: {
            currentUser: function(userService) {
                return userService.getUser(true);
            }
        }
    })
    .state("Album", {
        url: "/pictures/:albumId",
        templateUrl: "templates/album.html",
        controller: "picIdCtrl",

        resolve: {
            currentUser: function(userService) {
                return userService.getUser(true);
            }
        }
    })
    .state("AdminBulletin", {
        url: "/admin/bulletin",
        templateUrl: "templates/admin/aBulletin.html",
        controller: "bulletinCtrl",
        displayName: "Bulletin",

        resolve: {
            currentUser: function(userService) {
                return userService.getUser(true, true);
            }
        }
    })
    .state("AdminPictures", {
        url: "/admin/pictures",
        templateUrl: "templates/admin/aPictures.html",
        controller: "picCtrl",
        displayName: "Pictures",

        resolve: {
            currentUser: function(userService) {
                return userService.getUser(true, true);
            }
        }
    })
    .state("AdminAlbum", {
        url: "/admin/pictures/:albumId",
        templateUrl: "templates/admin/aAlbum.html",
        controller: "picIdCtrl",
        displayName: "Album",

        resolve: {
            currentUser: function(userService) {
                return userService.getUser(true, true);
            }
        }
    })

})
