/**
 * Created by Jessica on 04/06/2016.
 */
'use strict';

angular.module('tuttorialApp.prefer.service', [])

    .factory('ServizioPrefer', function servizioPrefer(FBURL, $firebaseArray, $firebaseObject){
        var ref = new Firebase (FBURL + '/prefers');
        return    {
            getPrefers: function () {
                return $firebaseArray(ref);
            },
            getPrefer: function(id){
                var preferRef = new Firebase(FBURL + '/prefers/' + id);
                return $firebaseObject(preferRef);
            },
            createPrefer: function(prefer, video){
                var newPrefer = {};
                newPrefer['prefer'] = prefer;
                newPrefer['video'] = video;
                return newPrefer;
            },
            addPrefer: function(prefer) {
                return $firebaseArray(ref).$add(prefer);
            }

        };
    });