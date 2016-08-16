
'use strict';

angular.module('tuttorialApp.challenge1.details', ['ngRoute','tuttorialApp.challenge.service', 'tuttorialApp.user'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/challenge1/:challengeId', {
            templateUrl: 'challenge1-details/challenge1-details.html',
            controller: 'Challenge1DetailsCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('Challenge1DetailsCtrl', ['$scope','ServiceChallenge','ServizioUser','$routeParams', 'currentAuth',
        function ($scope, ServiceChallenge, ServizioUser, $routeParams, currentAuth) {

            $scope.users= ServizioUser.getUsers();
            $scope.challenge = ServiceChallenge.getChallenge($routeParams.challengeId);
            $scope.comments = ServiceChallenge.getChallengeComments($routeParams.challengeId);

            $scope.setCheck = function (commentId){
                if (!$scope.challenge.checkDone && $scope.challenge.coach === currentAuth.uid){
                   ServiceChallenge.setCheck($scope.challenge.$id, commentId);
                    $scope.challenge.checkDone = true;
                }
            };

            $scope.addComment = function(e) {
                if (e.keyCode != 13) return;
                ServiceChallenge.addComment($scope.description, currentAuth.uid, $scope.challenge.$id);
                $scope.description = "";
            };
        }
    ]);