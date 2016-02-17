angular.module("pmApp").directive("navbar3Admin", function($state) {
    return {
        templateUrl: "js/directives/templates/navbar_3_admin.html",
        restrict: "E",
        scope: {},
        
        link: function(scope, element, attrs) {
            scope.route = $state.current.name;
            if ($state.$current.self.displayName) {
                scope.displayName = $state.$current.self.displayName;
            } else {
                scope.displayName = scope.route;
            }
        }
    }
})