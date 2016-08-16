/**
 * Created by Jessica on 12/05/2016.
 */
'use strict';

angular.module('tuttorialApp.video.service', [])

.factory('ServizioVideo', function servizioVideo(FBURL, $firebaseArray, $firebaseObject){
    var ref = new Firebase (FBURL + '/videos');
    return    {
        getVideos: function () {
            return $firebaseArray(ref);
        },
        getVideo: function(id){
            var videoRef = new Firebase(FBURL + '/videos/' + id);
            return $firebaseObject(videoRef);
        },
        getRating: function(videoId, userId){
            var ratingRef = new Firebase(FBURL + '/rating/' + userId + '/' + videoId);
            return $firebaseObject(ratingRef);
        },
        createVideo: function (titolo,categoria,url, userId, rating){
            var newVideo= {};
            newVideo['categoria']= categoria;
            newVideo['titolo']=titolo;
            newVideo['user']= userId;
            newVideo ['rating'] = rating;
            newVideo['video_url'] = url;
            newVideo['indice'] = 5;
            return newVideo;
        },
       addVideo: function(video){
           return $firebaseArray(ref).$add(video);
       }

    };
});