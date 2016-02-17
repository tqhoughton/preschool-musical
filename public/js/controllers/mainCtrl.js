angular.module("pmApp").controller("mainCtrl", function($scope, userService) {
    
    userService.getUser("home").then(function(res) {
        var user = res;
        if (user === "anon") {
            $scope.showLogin = true;
        } else if (user.role === "user") {
            $scope.showLogin = false;
            $scope.adminRoute = false;
        } else {
            $scope.showLogin = false;
            $scope.adminRoute = true;
        }
    })
    
    $scope.logOut = function() {
        userService.logOut().then(function(res) {
            $scope.showLogin = true;
        });
    }
})