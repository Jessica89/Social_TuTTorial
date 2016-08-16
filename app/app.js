/**
 * Created by Jessica on 08/05/2016.
 */
'use strict';

//percorsi
angular.module('tuttorialApp', [
    //dipendenze
    'ngRoute',
    'tuttorialApp.home',
    'tuttorialApp.video',
    'tuttorialApp.user',
    'tuttorialApp.users',
    'ui.bootstrap',
    'firebase',
    'tuttorialApp.navigation',
    'tuttorialApp.log-in',
    'tuttorialApp.profilo',
    'tuttorialApp.add',
    'tuttorialApp.sfide',
    'tuttorialApp.cerca',
    'tuttorialApp.user.profile',
    'tuttorialApp.users.list',
    'tuttorialApp.chat',
    'tuttorialApp.chat.login.service',
    'tuttorialApp.chat.service',
    'tuttorialApp.gallery_prefers',
    'tuttorialApp.prefer',
    'tuttorialApp.video.detail',
    'tuttorialApp.gallery',
    'tuttorialApp.ask',
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "tuttorialApp.challenge1",
    "tuttorialApp.challenge1.add",
    "tuttorialApp.challenge1.details",
    "tuttorialApp.challenge1.list"
])



//cnfiguarazione dei percorsi
.config(['$routeProvider', function ($routeProvider){
    $routeProvider.otherwise({redirectTo: '/home' });

}])

.constant('FBURL', 'appsocialtuttorial.firebaseio.com')


.factory("Auth", ["$firebaseAuth", "FBURL",
    function($firebaseAuth, FBURL) {
        var ref = new Firebase(FBURL);
        return $firebaseAuth(ref);
    }
])


.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError",function(event, next, previous, error) {
        if (error == "AUTH_REQUIRED"){
            $location.path("/log-in");
        }
    } );
}])


.controller('AppCtrl',
    ["$sce", "$timeout", function ($sce, $timeout) {
        var controller = this;
        controller.state = null;
        controller.API = null;
        controller.currentVideo = 5;

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };

        controller.onCompleteVideo = function() {
            controller.isCompleted = true;
            controller.currentVideo++;
            if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 5;

            controller.setVideo(controller.currentVideo);
        };

        controller.videos = [
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("../videos/video/java.mp4"), type: "video/mp4"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("../videos/video/mabrouk.mp4"), type: "video/mp4"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("../videos/video/ponpon.mp4"), type: "video/mp4"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("../videos/video/verticale.mp4"), type: "video/mp4"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("../videos/video/zuppa.mp4"), type: "video/mp4"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("../videos/video/default.mp4"), type: "video/mp4"}
                ]
            }
        ];


        controller.config = {
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false,
            sources: controller.videos[5].sources,
            theme: {
                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            },
            plugins: {
                poster: "../images/icon-192.png"
            }
        };

        controller.setVideo = function(index) {

            controller.API.stop();
            controller.currentVideo = index;
            controller.config.sources = controller.videos[index].sources;
            $timeout(controller.API.play.bind(controller.API), 100);

        };

        //controller.console($scope.video.rating.value);
    }]


);