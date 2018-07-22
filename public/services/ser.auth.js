/**
 * Created by Julius Alvarado on 9/5/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubAuthService', ['$firebaseAuth', '$rootScope',
        '$firebaseObject', '$location', '$q',
        EdhubAuthClass
    ]);

    function EdhubAuthClass($firebaseAuth, $rootScope, $firebaseObject, $location, $q) {
        $rootScope.rootEdhubAuthUser = "";
        const orgRef = firebase.database().ref('organizations');
        const auth = $firebaseAuth();
        var authApi = {};

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                var authUserRef = orgRef.child(authUser.uid);
                $rootScope.rootEdhubAuthUser = $firebaseObject(authUserRef);
                console.log("edhub - The Auth User =");
                console.log($rootScope.rootEdhubAuthUser);
                $rootScope.$broadcast("edhub-event-auth-user", {
                    haveAuthUser: true
                });
            } else {
                $rootScope.rootEdhubAuthUser = "";
                $rootScope.$broadcast("edhub-event-auth-user", {
                    haveAuthUser: false
                });
                console.log("There is no longer an Auth User");
                console.log($rootScope.rootEdhubAuthUser);
            }
        });

        authApi = {
            login: function (user, info) {
                auth.$signInWithEmailAndPassword(user.email, user.password)
                    .then(function (authUser) {
                        // console.log("edhub - user successfully signed in");
                        // console.log(authUser);
                        if(!!info.path) {
                            $location.path('/'+info.path);
                        } else {
                            $location.path('/');
                        }
                    })
                    .catch(function (error) {
                        console.error("edhub - There was an error =");
                        console.log(error.message);
                        $rootScope.rootAuthError = error.message;
                    });
            },
            logout: function () {
                return auth.$signOut();
            },
            requireAuth: function () {
                return auth.requireSignIn();
            },
            signup: function (user, info) {
                // give 'info a default value if nothing got passed in
                info = !!info ? info : {};
                console.log("edhub - signup user = ", user);
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                    .then(function (regUser) {
                        orgRef.child(regUser.uid).set({
                            date: firebase.database.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
                            orgName: !!user.orgName ? user.orgName : 'blank',
                            email: user.email,
                            repName: !!user.name ? user.name : 'blank'
                        });
                        $rootScope.rootMessage = "Thanks for registering " + user.name;
                        if(info.listOrg) {
                            console.log("broadcasting 'edhub-list-unauth-org-signup'");
                            $rootScope.$broadcast("edhub-list-unauth-org-signup", {
                                orgId: regUser.uid
                            });
                        }

                        authApi.login(user, info);
                    })
                    .catch(function (error) {
                        console.error("edhub - There was an error =");
                        console.log(error.message);
                        $rootScope.rootAuthError = error.message;
                        return null;
                    });
            },
            getAuthUser: getAuthUser
        };

        function getAuthUser() {
            return $rootScope.rootEdhubAuthUser;
        }

        // return $firebaseAuth();
        return authApi;
    }
}());