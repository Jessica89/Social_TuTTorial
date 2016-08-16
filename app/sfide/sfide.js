/**
 * Created by Jessica on 15/05/2016.
 */
'use strict';

angular.module('tuttorialApp.sfide', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sfide', {
            templateUrl: 'sfide/sfide.html',
            controller: 'SfideCtrl',
            resolve: {
                'currentAuth': ['Auth', function(Auth){
                    return Auth.$requireAuth();
                }]
            }
        });
    }])


.controller('SfideCtrl',['$scope',  function($scope) {
    $scope.open= function(){
        alert("Per poter partecipare a questa sfida devi sbloccarla!");
    }

}]);