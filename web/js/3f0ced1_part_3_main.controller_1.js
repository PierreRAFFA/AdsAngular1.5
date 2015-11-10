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

        this.$scope = $scope;

        //load ads
        var pathname = window.location.pathname.substr(1);
        this.loadAds(pathname);
    }

    MainController.MAX_ADS_DISPLAYED = 3;

    MainController.prototype.loadAds = function(pathname)
    {
        var self = this;

        var url = 'api/v1/ads/' + pathname;
        $.ajax(url, {
            success: function(data) {

                self.loadedAds = self.reformatJSON(data);

                self.$scope.$digest();

            },
            error: function() {
                console.error('Error when load ads')
            }
        });
    };

    MainController.prototype.reformatJSON = function(ads)
    {
        var json = null;

        if (ads)
        {
            json = JSON.parse(ads);

            //get background
            var background = '';
            if ( json.hasOwnProperty('general') && json.general.hasOwnProperty('bgimage'))
                background = json.general.bgimage;

            //get scenes
            var scenes = json.scenes.scene;

            //get max ads
            var maxAds = Math.min(MainController.MAX_ADS_DISPLAYED, scenes.length);

            for(var i=0 ; i < maxAds ; i++)
            {
                var scene = scenes[i];

                this.reformatScene(scene,background);
            }

            //update scenes to notify the html
            json.scenes.scene = scenes;
        }

        return json;
    };

    MainController.prototype.reformatScene = function(scene, background)
    {
        scene.background = background;

        var headline = scene.headline;

        var parts = headline.split('|');
        for( var i = 0 ; i < parts.length - 1; i+=2 )
        {
            var part = parts[i];
            if ( part === 'name')
                scene[part] = parts[i+1];
        }
    };

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////// ANGULAR REGISTERING
    MainController.$inject = ['$scope'];
    angular.module('AdApp').controller('MainController', MainController);

})(angular);