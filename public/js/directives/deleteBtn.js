angular.module("pmApp").directive("deleteBtn", function() {
    return {
        templateUrl: "js/directives/templates/deleteBtn.html",
        restrict: "E",
        
        link: function(scope, element, attrs) {
        }
    }
})