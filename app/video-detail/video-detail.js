/**
 * Created by Jessica on 19/05/2016.
 */

'use strict';

angular.module('tuttorialApp.video.detail', ['ngRoute','tuttorialApp.video', 'tuttorialApp.user'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/videos/:videoId', {
            templateUrl: 'video-detail/video-detail.html',
            controller: 'VideoDetCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('VideoDetCtrl', ['$scope','currentAuth','ServizioVideo','ServizioUser','$routeParams','VideoRating',
        function ($scope, currentAuth, ServizioVideo, ServizioUser, $routeParams, VideoRating) {
            $scope.video = ServizioVideo.getVideo($routeParams.videoId);
            $scope.rating = ServizioVideo.getRating($routeParams.videoId, currentAuth.uid);
            $scope.users = ServizioUser.getUsers();
            $scope.setRating = function (){
                if (!$scope.rating.voteSaved){
                    VideoRating.updateRating($routeParams.videoId, $scope.rating.value, currentAuth.uid);
                    $scope.rating.voteSaved = true;
                }

            }

        }
    ]);