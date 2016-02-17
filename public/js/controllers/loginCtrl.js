angular.module("pmApp").controller("loginCtrl", function($scope, userService, $state) {
    $scope.loginUser = function(email, pword) {
        userService.login(email, pword).then(function(res) {
            $scope.currentUser = res.data;
            console.log($scope.currentUser);
                if (res.data.role === "admin") {
                    $state.go("AdminBulletin");
                    console.log(res.data);
                } else {
                    $state.go("Bulletin");
                }
        });
    }
})