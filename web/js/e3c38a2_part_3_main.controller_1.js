'use strict';

(function(angular) {

    var $ = window.$;
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////  CONSTRUCTOR
    function MainController($scope)
    {
        /**
         * Ads loaded by ajax
         * @type {{}}
         */
        this.loadedAds = {};

        //load ads
        var pathname = window.location.pathname.substr(1);
        this.loadAds(pathname);
    }

    MainController.prototype.loadAds = function(pathname)
    {
        var self = this;

        var url = 'api/v1/ads/' + pathname;
        $.ajax(url, {
            success: function(data) {
                self.loadedAds = data;
            },
            error: function() {
                console.error('Error when load ads')
            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// ANGULAR REGISTERING
    MainController.$inject = ['$scope'];
    angular.module('AdApp').controller('MainController', MainController);

})(angular);