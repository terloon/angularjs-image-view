(function() {
    angular.module('image-widgets', [])
        .directive('imgSrc', function($window, $interval) {
            return {
                restrict: 'A',
                scope: {
                    imgSrc: '@',
                    onImgLoad: '&'
                },
                link: function(scope, element, attrs) {
                    if (!angular.isDefined(attrs.aspectRatio)) attrs.aspectRatio = '0:0';

                    var ratioVals = attrs.aspectRatio.split(':');

                    if (ratioVals.length != 2) return;

                    var ratioW = parseInt(ratioVals[0]);
                    var ratioH = parseInt(ratioVals[1]);

                    if (isNaN(ratioW) || isNaN(ratioH)) return;

                    var pad = ((ratioH / ratioW) * 100).toFixed(2);
                    var img = angular.element('<img />');

                    // Center the image within the element container.
                    var center = function() {
                        var cw = element[0].clientWidth;
                        var ch = element[0].clientHeight;

                        var iw = img[0].naturalWidth;
                        var ih = img[0].naturalHeight;
                        var ratio = iw / ih;

                        var newH = cw / ratio;
                        var top = (ch - newH) / 2;

                        angular.element(img).css('top', top + 'px');
                    };

                    // Initialize the element css.
                    var elementCss = {
                        'position': 'relative',
                        'overflow': 'hidden'
                    };

                    // Initialize the image css.
                    var imgCss = {
                        'display': 'none',
                        'top': '0',
                        'left': '0',
                        'position': 'absolute',
                        'width': '100%',
                        'opacity': '0',
                    };

                    // Check if we have a valid padding value and add it to the
                    // element css to provide proper aspect-ratio size for the
                    // container.
                    if (!isNaN(pad)) {
                        elementCss['padding-top'] = pad + '%';
                    } else {
                        imgCss['position'] = 'relative';
                        imgCss['height'] = '100%';
                    }

                    // Set the element css.
                    angular.element(element).css(elementCss);

                    // Add CSS3 transition attributes if fade-in is defined and
                    // has a valid value.
                    if (angular.isDefined(attrs.fadeIn)) {
                        var fadeIn = parseFloat(attrs.fadeIn);
                        if (!isNaN(fadeIn)) {
                            fadeIn = fadeIn.toFixed(2);
                            imgCss['-webkit-transition'] = 'opacity ' + fadeIn + 's ease-in';
                            imgCss['-moz-transition'] = 'opacity ' + fadeIn + 's ease-in';
                            imgCss['-ms-transition'] = 'opacity ' + fadeIn + 's ease-in';
                            imgCss['-o-transition'] = 'opacity ' + fadeIn + 's ease-in';
                            imgCss['transition'] = 'opacity ' + fadeIn + 's ease-in';
                        }
                    }

                    // Set the image css.
                    img.css(imgCss);
                    img.attr('src', scope.imgSrc);

                    // Add handler for when image has finished loading.
                    img.on('load', function() {
                        // If there is a valid padding, center the image.
                        !isNaN(pad) && center();

                        // Display the image.
                        img.css('display', 'block');

                        // So that the transition animation is triggered, we
                        // need to separate the display attribute change from
                        // the opacity change.
                        $interval(function() {
                            img.css('opacity', 1);
                        }, 100, 1);

                        // Call the user defined on load function.
                        angular.isDefined(scope.onImgLoad) && scope.onImgLoad();
                    });

                    // Append the image to the element. This should start the
                    // loading of the image.
                    element.append(img);

                    // If there is an aspect-ratio no the image, make sure to
                    // add a handler for when the browser is resized. This will
                    // appropriately re-center the image within its container.
                    if (!isNaN(pad)) {
                        angular.element($window).bind('resize', function() {
                            center();
                        });
                    }
                }
            }
        });
}());