angular.module("pmApp").service("userService", function($http, $state) {
    
    var username;
    
    this.getUsername = function() {
        return username;
    }
    
    this.login = function(email, pword) {
        return $http({
            url: "/api/login",
            method: "POST",
            data: {
                email: email,
                password: pword
            }
        }).then(function(res) {
            //I get data back here
            return res;
        })
    }
    
    this.logOut = function() {
        return $http({
            url: "api/logout",
            method: "GET"
        }).then(function(res) {
            return res;
        })
    }
    
    this.register = function(user) {
        return $http({
            url: "/api/register",
            method: "POST",
            data: user
        }).then(function(res) {
            return res;
        })
    }
    
    this.getUser = function(forceAuth, adminOnly) {
        return $http({
            method: "GET",
            url: "/api/getUser",
        }).then(function(res) {
            if (res.data === "notAuth") {
                if (forceAuth === "home") {
                    return "anon";
                } else if (forceAuth) {
                    $state.go("Log In");
                }
            } else {
                username = res.data.firstName;
                //if they are a user and it is an adminOnly route, go to login.
                if (adminOnly) {
                    if (res.data.role === "admin") {
                        return res.data;
                    } else {
                        $state.go("Log In");
                    }
                } else {
                    return res.data;
                }
            }
        }).catch(function(err) {
            console.error(err);
        })
    }
    
})