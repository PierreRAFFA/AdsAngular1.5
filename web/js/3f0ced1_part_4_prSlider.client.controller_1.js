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
            this.ads;

            /**
             * Array of scene ( contains background as well )
             * @type {Array}
             */
            this.scenes = [];


            this.currentSceneIndex = -1;

        };
        PRSliderController.ANIMATION_DURATION = 2000;
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////  DISPLAY ADS

        PRSliderController.prototype.reformatScene = function(scene, background)
        {
            scene.background = background;

            var headline = scene.headline;

            var parts = headline.split('|');
            for(var i = 0 ; i < parts.length - 1; i+=2)
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
            console.log('launchAnimation');
            var self = this;

            setInterval(function()
            {
                self.next();

            } , PRSliderController.ANIMATION_DURATION);
        };

        PRSliderController.prototype.next = function()
        {
            this.currentSceneIndex++;

            if ( this.currentSceneIndex >= this.ads.scenes.scene.length)
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

