angular.module("pmApp").directive("materialbox", function() {
    return {
        restrict: "A",
        link: function() {
            $('.materialboxed').materialbox();
        }
    }
})