/**
 * Created by Jessica on 01/06/2016.
 */


'use strict';

angular.module('tuttorialApp.gallery_prefers', ['ngRoute','tuttorialApp.video', 'tuttorialApp.user', 'tuttorialApp.prefer'])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users/:gallery_prefersId/prefers', {
            templateUrl: 'gallery_prefers/gallery_prefers.html',
            controller: 'GalleryPreferCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .filter('unique', function() {
        return function(collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function(item) {
                var key = item[keyname];
                if(keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    })


    .controller('GalleryPreferCtrl', ['$scope','ServizioVideo','ServizioUser','ServizioPrefer','$routeParams',
        function ($scope, ServizioVideo, ServizioUser,ServizioPrefer, $routeParams) {
            $scope.prefers = ServizioPrefer.getPrefers();
            $scope.videos = ServizioVideo.getVideos();
            $scope.user = ServizioUser.getUser($routeParams.gallery_prefersId);

        }
    ]);