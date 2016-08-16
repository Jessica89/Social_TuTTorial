
'use strict';

angular.module('tuttorialApp.challenge.service', [])

.factory('ServiceChallenge', function serviceChallenge(FBURL, $firebaseArray, $firebaseObject){
    return    {
        getChallenges: function (type) {
            var ref = new Firebase (FBURL + '/challenge');
            ref.orderByChild("type").equalTo(type);
            return $firebaseArray(ref);
        },
        getChallenge: function(id){
            var ref = new Firebase(FBURL + '/challenge/' + id);
            return $firebaseObject(ref);
        },
        getCategories: function(){
            var ref = new Firebase(FBURL + '/categories');
            return $firebaseArray(ref);
        },
        getChallengeComments: function(id){
            var ref = new Firebase(FBURL + '/comments').orderByChild("challenge").equalTo(id);
            return $firebaseArray(ref);

        },
        setCheck: function(challengeId, commentId) {
            var ref = new Firebase(FBURL + '/challenge/' + challengeId).set({check:commentId, checkDone:true});
        },
        addChallenge: function(title, video_url, category, userId, challengeType) {
            var ref = new Firebase (FBURL +'/challenge/').push({title:title, video_url:video_url, category:category, coach:userId, type:challengeType,
                checkDone:false, check:null});
        },
        addComment: function(description, userId, challengeId) {
            var ref = new Firebase(FBURL + '/comments').push({description: description, user: userId, challenge: challengeId});
        }
    };
});