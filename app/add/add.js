/**
 * Created by Jessica on 15/05/2016.
 */

'use strict';

angular.module('tuttorialApp.add', ['ngRoute','ngFileUpload'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/add', {
            templateUrl: 'add/add.html',
            controller: 'AddCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

.controller('AddCtrl', ['$scope','ServizioVideo','ServizioUser', 'VideoRating', 'FBURL', '$firebaseArray', '$location', 'Upload', '$log','currentAuth',

    function ($scope, ServizioVideo, ServizioUser,VideoRating, FBURL, $firebaseArray, $location, Upload, $log, currentAuth) {

        $scope.videos = ServizioVideo.getVideos();
        $scope.users= ServizioUser.getUsers();

        //get the userId from currentAuth
        $scope.userId = currentAuth.uid;
        //add video in videos
        $scope.addVideo = function(titolo, categoria, url) {
            var newRating = VideoRating.createRating();
            var newVideo = ServizioVideo.createVideo(titolo, categoria, url, $scope.userId, newRating);
            ServizioVideo.addVideo(newVideo).then(function () {
                $location.path("/home");
            });
        };


    }
]);



