/**
 * Created by Jessica on 15/05/2016.
 */
'use strict';

angular.module('tuttorialApp.cerca', ['ngRoute','tuttorialApp.video'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cerca', {
            templateUrl: 'cerca/cerca.html',
            controller: 'CercaCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('CercaCtrl', ['$scope','ServizioVideo','ServizioUser','ServizioPrefer' , '$routeParams','currentAuth',
        function ($scope, ServizioVideo, ServizioUser, ServizioPrefer, $routeParams, currentAuth) {
            $scope.videos = ServizioVideo.getVideos();
            $scope.users= ServizioUser.getUsers();

            //get the userId from currentAuth
            $scope.userId = currentAuth.uid;
            $scope.addPrefer = function(video) {

             //create the JSON structure that should be sent to Firebase
            var newPrefer = ServizioPrefer.createPrefer($scope.userId, video);
            ServizioPrefer.addPrefer( newPrefer);

            };


        }]);

