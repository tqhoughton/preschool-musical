angular.module("pmApp").directive("realNavbar", function($state, userService) {
    return {
        templateUrl: "js/directives/templates/realNavbar.html",
        restrict: "E",
        scope: {},
        
        link: function(scope, element, attrs) {
            scope.isAdmin = false;
            scope.route = $state.current.name;
            scope.isUser = false;
            
            scope.logOut = function() {
                userService.logOut();
            }
            
            userService.getUser().then(function(res) {
                if (res) {
                    if (res.role === "admin" || res.role === "user") {
                        scope.isUser = true;
                    }
                    if (res.role === "admin") {
                        scope.isAdmin = true;
                    }
                }                
            })
        }
    }
})