'use strict';
angular.module('AdApp').directive('prSlider', [
    function() {
        return {
            templateUrl: '/bundles/app/js/directives/prSlider/prSlider.html',
            restrict: 'E',
            replace: true,
            scope: {},
            bindToController: {
                ads: '='
            },
            controller: 'PRSliderController',
            controllerAs: 'vm'
        };
    }
]);