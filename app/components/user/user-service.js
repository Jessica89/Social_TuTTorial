/**
 * Created by Jessica on 15/05/2016.
 */

'use strict';

angular.module('tuttorialApp.user.service', [])

.factory('ServizioUser', function servizioUser(FBURL, $firebaseArray, $firebaseObject){
        var ref = new Firebase (FBURL + '/users');
        return {
            getUsers: function() {
                return $firebaseArray(ref);
            },
            getUser: function(id) {
                var userRef = new Firebase(FBURL + '/users/' + id);
                return $firebaseObject(userRef);
            },


        }
    });