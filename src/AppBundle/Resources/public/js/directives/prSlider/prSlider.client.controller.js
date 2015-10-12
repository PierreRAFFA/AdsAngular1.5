'use strict';

angular.module('AdApp').controller('PRSliderController', [ '$scope', '$element',

    function($scope, $element) {

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////  CONSTRUCTOR
        var PRSliderController = function() {

            /**
             * HTML Element
             */
            this.$element = $element;

            /**
             *  all ads
             * @type {{}}
             */
            this.ads = {};

            /**
             * Array of scene ( contains background as well )
             * @type {Array}
             */
            this.scenes = [];

            /**
             *
             * @type {number}
             */
            this.currentSceneIndex = -1;

        };
        PRSliderController.MAX_ADS_DISPLAYED = 3;
        PRSliderController.ANIMATION_DURATION = 3000;
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////  DISPLAY ADS
        PRSliderController.prototype.displayAds = function()
        {
            if (this.ads)
            {
                var json = JSON.parse(this.ads);

                //get background
                var background = json.general.bgimage;

                //get scenes
                var scenes = json.scenes.scene;

                //get max ads
                var maxAds = Math.min(PRSliderController.MAX_ADS_DISPLAYED, scenes.length);

                for(var i=0 ; i < maxAds ; i++)
                {
                    var scene = scenes[i];

                    this.reformatScene(scene,background);
                }

                //update scenes to notify the html
                this.scenes = scenes;
            }
        };

        PRSliderController.prototype.reformatScene = function(scene, background)
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
        ///////////////////////////////////////////////////////////  ANIMATION
        PRSliderController.prototype.launchAnimation = function()
        {
            var self = this;

            setInterval(function()
            {
                self.next();

            } , PRSliderController.ANIMATION_DURATION);
        };

        PRSliderController.prototype.next = function()
        {
            this.currentSceneIndex++;

            if ( this.currentSceneIndex >= this.scenes.length)
                this.currentSceneIndex = 0;

            var $containerHtml = $(this.$element).find('.container');
            $containerHtml.css('left' , -(this.currentSceneIndex * 300) + 'px');
        };

        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////  TRACK
        PRSliderController.prototype.trackClick = function(event)
        {
            //There is no id for the ad, so I take the index even if it's not correct
            var $target = $(event.currentTarget);

            var id = $target.attr('data-id');

            var url = '/api/v1/trackingclicks?adId=' + id;
            $.ajax({
                method: "POST",
                url: url
            }).done(function( msg ) {
                alert( "Data Saved: " + msg );
            });
        };

        return new PRSliderController();
    }
]);

