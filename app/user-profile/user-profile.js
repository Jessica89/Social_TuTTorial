/**
 * Created by Jessica on 09/05/2016.
 */
'use strict';

angular.module('tuttorialApp.user.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/user-profile',{
        templateUrl:'user-profile/user-profile.html',
        controller: 'UserProfCtrl',
        resolve: {
            'currentAuth': ['Auth', function(Auth){
                return Auth.$requireAuth();
            }]
        }

    });
}])




 .controller('UserProfCtrl', ['$scope', 'currentAuth','$firebaseObject', 'FBURL', 'Auth', '$location', 'ServizioVideo',
    function($scope, currentAuth, $firebaseObject, FBURL, Auth, $location, ServizioVideo) {

        $scope.videos = ServizioVideo.getVideos();
        // the next 2 lines should be performed in a User service...
        var ref = new Firebase(FBURL + '/users/' + currentAuth.uid);
        // get user information
        $scope.user = $firebaseObject(ref);
        // get the auth
        $scope.auth = Auth;

        // called when a change occurs in the authentication state
        $scope.auth.$onAuth(function(authData) {
            // logout
            if(authData === null)
                $location.path("/log-in");
        });


    }


]);



