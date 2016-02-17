angular.module("pmApp").controller("registerCtrl", function($scope, userService, $state) {
    $scope.step = 1;
    
    $scope.newUser = {};

    /*$scope.classes=[
        {title: "M/W/F 9am-12pm"},
        {title: "T/Th 9am-12pm"}
    ]*/
    
    /*$('#options1').on("click", function() {
        $scope.class = "mwf";
    })
    
    $('#options2').on("click", function() {
        $scope.class = "tth";
    })*/
    
    /*$(document).ready(function() {
        $('select').material_select();
    });*/
    
    $scope.signUp = function(newUser, pword1, pword2) {
        if (pword1 === pword2) {
            newUser.password = pword1;
            userService.register(newUser);
        } else {
            alert("passwords do not match.")
        }
        
    }
    
    $scope.logOut = function() {
        userService.logOut();
        $state.go("Home");
    }
    
    $scope.goToLogin = function() {
        $state.go("Log In");
    }
    
})