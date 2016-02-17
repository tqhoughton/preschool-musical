angular.module("pmApp").directive("navbarUnder", function($state) {
    return {
        templateUrl: "js/directives/templates/navbar_under.html",
        restrict: "E",
        scope: {},
        
        link: function(scope, element, attrs) {
            scope.route = $state.current.name;
        }
    }
})