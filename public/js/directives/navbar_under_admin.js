angular.module("pmApp").directive("navbarUnderAdmin", function($state) {
    return {
        templateUrl: "js/directives/templates/navbar_under_admin.html",
        restrict: "E",
        scope: {},
        
        link: function(scope, element, attrs) {
            scope.route = $state.current.name;
        }
    }
})