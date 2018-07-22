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
                // 2
                .when('/signup', {
                    templateUrl: 'states/auth/view.tab.join.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/signup2', {
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/signup/:status', {
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/login', {
                    templateUrl: 'states/auth/view.login.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'login',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/user-auth-logout/logout-page', {
                    templateUrl: 'states/auth/view.logout.html'
                })
                .when('/profile/:user', {
                    templateUrl: 'states/auth/view.profile.html'
                })
                .when('/post', {
                    templateUrl: 'states/post/view.post.html',
                    controller: 'PostCtrl',
                    controllerAs: 'postJobCtrl'
                })
                .when('/apply', {
                    templateUrl: 'states/apply/view.apply.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
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
                .when('/apply-thanks', {
                    templateUrl: 'states/apply/view.thanks.html'
                })
                .when('/apply-job/:orgName/:jobId', {
                    templateUrl: 'states/apply/view.apply.job-org.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
                })
                .when('/applications', {
                    templateUrl: 'states/org-apps/view.org-apps.html',
                    controller: 'OrgApplicantsCtrl',
                    controllerAs: 'orgApps'
                })
                .when('/present-tables', {
                    templateUrl: "states/presentTables/view.present-tables.html",
                    controller: "PresentTablesCtrl",
                    controllerAs: "presentTables"
                })
                // practice stuff
                .when('/lab916', {
                    templateUrl: '/states/lab916/view.landing.html'
                })
                .when('/ui1', {
                    templateUrl: 'ui-prac/ui1.html',
                    controller: 'uiPracCtrl',
                    controllerAs: 'ui'
                })
                .when('/ui2', {
                    templateUrl: 'ui-prac/ui2.html',
                    controller: 'uiPracCtrl',
                    controllerAs: 'ui'
                })
                .when('/interval', {
                    templateUrl: 'ui-prac/intervalExample.html',
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
