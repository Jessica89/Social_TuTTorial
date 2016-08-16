/**
 * Created by Jessica on 09/06/2016.
 */

'use strict';

angular.module('tuttorialApp.ask', ['ngRoute', 'tuttorialApp.users'])

    // Route Config
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/ask', {
            templateUrl: 'ask/ask.html',
            controller: 'UsersAskCtrl',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in app.js
                'currentAuth': ['Auth', function(Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // if the promise is rejected, it will throw a $stateChangeError
                    return Auth.$requireAuth();
                }]
            }
        });
    }])

    // Controller
    .controller('UsersAskCtrl', ['$scope', '$log', 'ChatService', 'currentAuth','$routeParams','ServizioUser',
        function($scope, $log, ChatService, currentAuth, $routeParams, ServizioUser ) {
            //get the userId from currentAuth
            $scope.userId = currentAuth.uid;
            //get the interlocutor Id from the parameters contained in the url
            $scope.coachs = ServizioUser.getUsers();

            $scope.user = ChatService.getUserInfo($scope.userId);

            //get messages from firebase
            $scope.messages = ChatService.getMessages();
            //function that add a message on firebase
            $scope.addMessage = function(e) {
                if (e.keyCode != 13) return;
                //create the JSON structure that should be sent to Firebase
                var newMessage = ChatService.createMessage($scope.userId, $scope.user.name, $routeParams.userId, $scope.msg);
                ChatService.addMessage(newMessage);
                $scope.msg = "";
            };
        }
    ]);