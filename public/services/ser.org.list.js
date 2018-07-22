/**
 * Created by Julius Alvarado on 4/29/2018.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('eOrgListFact', ['$rootScope',
        '$firebaseArray',
        OrgListClass
    ]);

    function OrgListClass($rootScope, $firebaseArray) {

        const orgListingsRef = firebase.database().ref('orgListings');
        const orgFeedRef = firebase.database().ref('orgFeed');
        const orgApplicantsRef = firebase.database().ref('orgApplicants');

        function listOrg(orgInfo, orgId) {
            return $firebaseArray(orgListingsRef.child(orgId)).$add(orgInfo).then(function (ref) {
                return ref;
            });
        }

        function postToOrgFeed(orgInfo, orgId) {
            orgInfo.timestamp = firebase.database.ServerValue.TIMESTAMP;
            orgInfo.orgId = orgId;
            return $firebaseArray(orgFeedRef).$add(orgInfo).then(function (refNode) {
                return refNode;
            });
        }

        function readFromOrgFeed(limit, orderFeedBy) {
            let qOrderLimit = orgFeedRef.orderByChild(orderFeedBy).limitToLast(limit);
            return $firebaseArray(qOrderLimit);
        }

        function getOrgApplicants(edhubUserId) {
            return $firebaseArray(orgApplicantsRef.child(edhubUserId));
        }

        return {
            listOrg: listOrg,
            postToOrgFeed: postToOrgFeed,
            readFromOrgFeed: readFromOrgFeed,
            getOrgApplicants: getOrgApplicants
        };

    }
}());
