
'use strict';

angular.module('tuttorialApp.challenge1', ['ngRoute','tuttorialApp.challenge.service', 'tuttorialApp.user'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/challenge1', {
            templateUrl: 'challenge1/challenge1.html',
            controller: 'Challenge1Ctrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('Challenge1Ctrl', ['$scope','ServiceChallenge','ServizioUser',
        function ($scope, ServiceChallenge, ServizioUser) {

            $scope.categories =ServiceChallenge.getCategories();

        }
    ]);