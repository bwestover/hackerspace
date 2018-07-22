/**
 * Created by Julius Alvarado on 9/17/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubJobPostService', ['$firebaseArray',
        'edhubAuthService', EdhubJobPostClass
    ]);

    function EdhubJobPostClass($firebaseArray, edhubAuthService) {

        const refJobPostings = firebase.database().ref('jobPostings');
        const refOrgApplicants = firebase.database().ref('orgApplicants');
        const refApplicantJobApps = firebase.database().ref('applicantJobApps');

        function jobPostingsLimitTo(limit) {
            const qJobPostingsLimitToOrderByDate =
                refJobPostings.orderByChild("timeStamp").limitToLast(limit);
            return $firebaseArray(qJobPostingsLimitToOrderByDate);
        }

        function listOrganization(orgData, orgId) {
            /* - old attempt to signup from with in this factory rather than from the controllers
             var signupInfo = {
                email: orgData.email,
                pw: orgData.pw ? orgData.pw : null
            };
            var orgId = edhubAuthService.signup(signupInfo);
            */

            // TODO: seriously figure out / practice correctly returning this
            return $firebaseArray(refJobPostings.child(orgId)).$add(orgData).then(function (ref) {
                return ref;
            });
        }

        function forOrg(orgId) {
            return $firebaseArray(refOrgApplicants.child(orgId));
        }

        function forApplicants(applicantId) {

        }
        
        function applicantJobApplication() {

        }

        return {
            jobPostings: $firebaseArray(refJobPostings),
            jobPostingsLimitTo: jobPostingsLimitTo,
            forOrg: forOrg,
            listOrganization: listOrganization
        };
    }
}());


