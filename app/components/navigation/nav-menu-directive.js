/**
 * Created by Jessica on 16/05/2016.
 */
angular.module('tuttorialApp.navigation.menu', [])

    .directive('navMenu', ['$location', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var links = elem.find('a'), link, currentMenu, urlMap = {}, i;
                var routePattern = /^#[^/]*/;
                for (i = 0; i<links.length; i++)
                {
                    link = angular.element(links[i]);
                    var parentLi = link.parent();
                    var url = link.attr('href');
                    urlMap[url.replace(routePattern, '')] = parentLi;
                }

                scope.$on('$routeChangeStart', function() {
                    var basePath = $location.path();
                    var lastSlash = basePath.lastIndexOf('/');
                    if(lastSlash > 0)
                        basePath = basePath.substring(0, lastSlash)
                    var pathLink = urlMap[basePath];

                    if (pathLink) {
                        if (currentMenu) {
                            currentMenu.removeClass('active');
                        }
                        currentMenu = pathLink;
                        currentMenu.addClass('active');
                    }
                });
            }
        };
    }]);