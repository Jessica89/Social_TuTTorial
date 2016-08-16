
'use strict';

angular.module('tuttorialApp.challenge1.list', ['ngRoute','tuttorialApp.challenge.service', 'tuttorialApp.user'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/challenge1-categories/:categoryId', {
            templateUrl: 'challenge1-list/challenge1-list.html',
            controller: 'Challenge1ListCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('Challenge1ListCtrl', ['$scope','ServiceChallenge','ServizioUser', '$routeParams',
        function ($scope, ServiceChallenge, ServizioUser, $routeParams) {

            $scope.selectedCategory= $routeParams.categoryId;
            $scope.users= ServizioUser.getUsers();
            $scope.challenges =ServiceChallenge.getChallenges(1);

        }
    ]);