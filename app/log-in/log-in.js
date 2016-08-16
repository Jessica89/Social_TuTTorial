/**
 * Created by Jessica on 08/05/2016.
 */
'use strict';

angular.module('tuttorialApp.log-in', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/log-in', {
            templateUrl: 'log-in/log-in.html',
            controller: 'LoginCtrl'
        });
    }])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', '$log',
    function($scope, Auth, $location, $log){
        $scope.auth = Auth;

        $scope.login = function() {
            $scope.error= null;
            $scope.auth.$authWithPassword($scope.user).then(function(authData) {
                $location.path("/home");
            }).catch(function(error){
                $scope.error = error.message;
                $log.error(error.message);
            });
        };
    }]);