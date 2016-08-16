/**
 * Created by Jessica on 15/05/2016.
 */

'use strict';

angular.module('tuttorialApp.users', ['ngRoute','tuttorialApp.user'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    .controller('UsersCtrl', ['$scope','ServizioUser',
        function ($scope, ServizioUser) {
            $scope.users = ServizioUser.getUsers();

        }]);