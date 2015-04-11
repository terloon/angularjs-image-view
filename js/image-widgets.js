(function() {
    angular.module('image-widgets', [])
        .directive('imgSrc', function($window, $interval) {
            return {
                restrict: 'A',
                scope: {
                    imgSrc: '@'
                },
                link: function(scope, element, attrs) {
                    if (!angular.isDefined(attrs.ratio)) attrs.ratio = '0:0';
                    var ratioVals = attrs.ratio.split(':');

                    if (ratioVals.length != 2) return;
                    var ratioW = parseInt(ratioVals[0]);
                    var ratioH = parseInt(ratioVals[1]);

                    if (isNaN(ratioW) || isNaN(ratioH)) return;

                    var pad = ((ratioH / ratioW) * 100).toFixed(2);
                    console.log('pad = ' + pad);
                    var img = angular.element('<img />');

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

                    var elementCss = {
                        'position': 'relative',
                        'overflow': 'hidden'
                    };

                    var imgCss = {
                        'display': 'none',
                        'top': '0',
                        'left': '0',
                        'position': 'absolute',
                        'width': '100%',
                        'opacity': '0',
                    };

                    if (!isNaN(pad)) {
                        elementCss['padding-top'] = pad + '%';
                    } else {
                        imgCss['position'] = 'relative';
                        imgCss['height'] = '100%';
                    }

                    angular.element(element).css(elementCss);

                    if (angular.isDefined(attrs.fadeIn)) {
                        imgCss['-webkit-transition'] = 'opacity 0.5s ease-in';
                        imgCss['-moz-transition'] = 'opacity 0.5s ease-in';
                        imgCss['-ms-transition'] = 'opacity 0.5s ease-in';
                        imgCss['-o-transition'] = 'opacity 0.5s ease-in';
                        imgCss['transition'] = 'opacity 0.5s ease-in';
                    }

                    img.css(imgCss);

                    img.attr('src', scope.imgSrc);

                    img.on('load', function() {
                        if (!isNaN(pad)) {
                            center();
                        }
                        img.css('display', 'block');
                        $interval(function() {
                            img.css('opacity', 1);
                        }, 100, 1);
                    });

                    element.append(img);

                    if (!isNaN(pad)) {
                        angular.element($window).bind('resize', function() {
                            center();
                        });
                    }
                }
            }
        });
}());