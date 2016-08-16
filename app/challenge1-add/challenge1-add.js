
'use strict';

angular.module('tuttorialApp.challenge1.add', ['ngRoute','tuttorialApp.challenge.service'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/challenge1-add', {
            templateUrl: 'challenge1-add/challenge1-add.html',
            controller: 'Challenge1AddCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('Challenge1AddCtrl', ['$scope','ServiceChallenge','currentAuth',
        function ($scope, ServiceChallenge, currentAuth) {

            $scope.categories =ServiceChallenge.getCategories();

            $scope.addChallenge = function (){
                ServiceChallenge.addChallenge($scope.title, $scope.video_url, $scope.category, currentAuth.uid, 1);
                $scope.title= "";
                $scope.video_url= "";
            }
        }
    ]);