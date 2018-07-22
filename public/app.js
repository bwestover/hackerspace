/**
 * Created by Julius Alvarado on 9/2/2017.
 */

angular
    .module('edhubJobsApp', [
        'firebase',
        'angular-md5',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons',
        'smoothScroll'
    ])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider) {
            $routeProvider
                // 1
                .when('/', {
                    templateUrl: 'states/landing/view.landing.html',
                    controller: 'LandingCtrl',
                    controllerAs: 'landingCtrl'
                })
                .when('/join', {
                    templateUrl: "states/join/view.join.html",
                    controller: "HackFindCtrl",
                    controllerAs: "hackFindCtrl"
                })
                .when('/join-team/:teamId/:teamName', {
                    templateUrl: 'states/apply/view.apply.org.html',
                    controller: 'ApplyToOrgCtrl',
                    controllerAs: 'applyToOrgCtrl',
                    resolve: {
                        orgJobAppsRslv: function ($route, edhubJobPostService) {
                            return edhubJobPostService.forOrg($route.current.params.orgId).$loaded();
                        }
                    }
                })
                .when('/apply/:orgId/:orgName', {
                    templateUrl: 'states/apply/view.apply.org.html',
                    controller: 'ApplyToOrgCtrl',
                    controllerAs: 'applyToOrgCtrl',
                    resolve: {
                        orgJobAppsRslv: function ($route, edhubJobPostService) {
                            return edhubJobPostService.forOrg($route.current.params.orgId).$loaded();
                        }
                    }
                })
                .when('/present-tables', {
                    templateUrl: "states/presentTables/view.present-tables.html",
                    controller: "PresentTablesCtrl",
                    controllerAs: "presentTables"
                })
                // go to base url
                .otherwise('/');


            // Initialize Firebase
            const config = {
                apiKey: "REDACTED",
                authDomain: "hack-find.firebaseapp.com",
                databaseURL: "https://hack-find.firebaseio.com",
                projectId: "hack-find",
                storageBucket: "hack-find.appspot.com",
                messagingSenderId: "575792060346"
            };
            firebase.initializeApp(config);
        }
    ]);
