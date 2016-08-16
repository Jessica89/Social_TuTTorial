/**
 * Created by Claire on 20/05/16.
 */

'use strict';

angular.module('tuttorialApp.chat', ['ngRoute', 'tuttorialApp.users'])

    // Route Config
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/chat/:userId', {
            templateUrl: 'chat/chat.html',
            controller: 'UsersChatCtrl',
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
    .controller('UsersChatCtrl', ['$scope', '$log', 'ChatService', 'currentAuth','$routeParams',
        function($scope, $log, ChatService, currentAuth, $routeParams ) {
            //get the userId from currentAuth
            $scope.userId = currentAuth.uid;
            //get the interlocutor Id from the parameters contained in the url
            $scope.interlocutorId = $routeParams.userId;

            $scope.orderProp = 'utctime';
            $scope.userInfo = ChatService.getUserInfo($scope.userId);

            //get messages from firebase
            $scope.messages = ChatService.getMessages();
            //function that add a message on firebase
            $scope.addMessage = function(e) {
                if (e.keyCode != 13) return;
                //create the JSON structure that should be sent to Firebase
                var newMessage = ChatService.createMessage($scope.userId, $scope.userInfo.name, $routeParams.userId, $scope.msg);
                ChatService.addMessage(newMessage);
                $scope.msg = "";
            };
        }
    ]);