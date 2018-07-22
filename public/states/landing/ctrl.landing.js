/**
 * Created by Julius Alvarado on 9/4/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('LandingCtrl', ['edhubJobPostService', '$location',
        'smoothScroll', 'eOrgListFact', '$rootScope',
        LandingClass
    ]);

    function LandingClass(edhubJobPostService, $location, smoothScroll,
                          eOrgListFact, $rootScope) {

        const vm = this;

        vm.showVid = true;

        vm.apply2job = function (organizationName, postId) {
            $location.url('/apply/' + postId + '/' + organizationName);
        };

        vm.goToJoinView = function () {
            $location.path('/join');
            console.log("should have gone to join ngView");
        };

        vm.apply2org = function (orgInfo) {
            if($rootScope.rootEdhubAuthUser) {
                $location.url('/apply/'+orgInfo.orgId+'/'+orgInfo.orgName);
            } else {
                $location.url('/signup/sta');
            }
        };

        vm.scroll2recentJobs = function () {
            let elem = document.getElementById("edhub-recent-jobs-landing-title");
            smoothScroll(elem);
        };

        // invoke util functions imm!
        activate();

        function activate() {
            eOrgListFact.readFromOrgFeed(5, 'timestamp').$loaded().then(function (data) {
                vm.orgFeed = data;
            }).catch(function (error) {
                console.error('edhub - Error: ', error);
            });
        }
    }

}());