/**
 * Created by Jessica on 22/05/2016.
 */

'use strict';

angular.module('tuttorialApp.gallery', ['ngRoute','tuttorialApp.video', 'tuttorialApp.user'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users/:galleryId/videos', {
            templateUrl: 'gallery/gallery.html',
            controller: 'GalleryCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('GalleryCtrl', ['$scope','ServizioVideo','ServizioUser','$routeParams',
        function ($scope, ServizioVideo, ServizioUser, $routeParams) {
            $scope.videos = ServizioVideo.getVideos();
            $scope.user = ServizioUser.getUser($routeParams.galleryId)

        }
    ]);