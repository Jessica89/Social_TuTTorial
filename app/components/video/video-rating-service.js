/**
 * Created by Jessica on 19/05/2016.
 */
'use strict';

angular.module('tuttoriaApp.video.rating.service', [])

.factory('VideoRating', function videoRatingService(FBURL, $firebaseArray, $firebaseObject){
    return{
        updateRating: function(id, vote, userId) {
            var ref = new Firebase (FBURL +'/videos/'+ id +'/rating');

            // create a transaction
            ref.transaction(function (currentValue) {
                var newRating = {};

                newRating['votes'] = (currentValue['votes'] || 0) + 1;
                newRating['total'] = (currentValue['total'] || 0) + vote;
                newRating['value'] = Math.round(newRating['total']/newRating['votes']);
                return newRating;
            });


            ref = new Firebase (FBURL + '/rating/' + userId + '/' + id);
            ref.set({value:vote, voteSaved:true});

    },
        createRating: function () {
            var newRating = {
                votes: 0,
                total: 0,
                value: 0
            };
            return newRating;
        }
    };
});
