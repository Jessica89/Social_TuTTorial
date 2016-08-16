/**
 * Created by Jessica on 09/05/2016.
 */
'use strict';

angular.module('tuttorialApp.profilo', ['ngRoute', 'tuttorialApp.user'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/users/:profiloId',{
        templateUrl:'profilo/profilo.html',
        controller: 'ProfCtrl',
        resolve: {
            'currentAuth': ['Auth', function(Auth){
                return Auth.$requireAuth();
            }]
        }

    });
}])

.controller('ProfCtrl', ['$scope', '$routeParams', 'ServizioUser',
    function($scope, $routeParams, ServizioUser) {
        $scope.user = ServizioUser.getUser($routeParams.profiloId)

}]);



