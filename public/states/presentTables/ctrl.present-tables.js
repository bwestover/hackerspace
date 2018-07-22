/**
 * Created by Julius Alvarado on 7/1/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('PresentTablesCtrl', ['$rootScope', 'edhubAuthService', 'eOrgListFact',
        '$http', '$interval',
        PresentTablesClass
    ]);

    function PresentTablesClass($rootScope, edhubAuthService,
                                eOrgListFact, $http, $interval) {
        let progress;
        const vm = this;

        vm.message = "hello from PresentTablesClass ctrl ^_^/";
        vm.showProgressCards = false;

        /*
        // declared here, but initialized in the $http.get() request
        // these are the tables from the SV2_Load table
        {
            "name": "Julius",
            "languages": "php7",
            "frameworks": "no answer",
            "databases": "no answer",
            "idea": "no answer"
        }
        */
        vm.presentUsersData = [];

        /*
        // These are the cards that will show when
        // a 'presentTableData' cards START btn is clicked
        example data model:
        {
                svId: 9999,                 // int
                tableName: "table_name",    // string
                okResponseCount: 1460,      // int
                fillerImageCount: 116,      // int
                streetViewImageCount: 5124  // int
            }
        */
        vm.tableProgressData = [];

        vm.goToPersonView = function () {

        };

        // TODO: this needs to get put in a data service
        const reqStr = "https://hackersconnect.herokuapp.com/api/hackers/";
        // http://localhost/sv2/?v=2&get_uri=present
        // https://brett.herokuapp.com/some/foo/bar

        // right when this controller is invoked in the ngView
        // get some data
        // TODO: wrap $http into a service and hit our back end ^_^
        $http.get(reqStr).then(function (response) {
            vm.presentUsersData = response.data.data;


            console.log("should have got hacker info", response.data);
            //vm.presentTableData.push({});
        });

        vm.startQuery = function (tableName, svId, elem) {
            // TODO: wrap $http into a service and hit our back end ^_^
            vm.showProgressCards = true;
            vm.tableProgressData.push({
                svId: svId,
                tableName: tableName,
                okResponseCount: 0,
                fillerImageCount: 0,
                streetViewImageCount: 0
            });
            /* when elem is clicked splice it from data set so it gets removed from the ui */
            let idx = vm.presentTableData.indexOf(elem);
            vm.presentTableData.splice(idx, 1);
            // start updating progress every second
            realTimeProgress();
        };

        vm.stopProgress = function () {
            if (angular.isDefined(progress)) {
                $interval.cancel(progress);
                progress = undefined;
            }
        };

        let realTimeProgress = function () {
            if (angular.isDefined(progress)) return;

            // update progress for a maximum of 90mins
            progress = $interval(function () {
                vm.tableProgressData.forEach(function (obj) {
                    let table = obj["tableName"];
                    obj["okResponseCount"] += mockApiReq(table, "okResponseCount");
                    obj["fillerImageCount"] += mockApiReq(table, "fillerImageCount");
                    obj["streetViewImageCount"] += mockApiReq(table, "streetViewImageCount");
                });
            }, 1500, 9000);
        };

        // very, Very hard coded... but it'll work.
        let mockApiReq = function (tableName, actionCount) {
            console.log("fake uri = .com/?table_name=" + tableName + "&action_count=" + actionCount);
            if (tableName === "mailing_list2") {
                return (actionCount === "okResponseCount") ? 5
                    : (actionCount === "fillerImageCount") ? 10
                        : (actionCount ==="streetViewImageCount") ? 20
                            : -1; // -1 indicates something went wrong;
            } else if (tableName === "sv56076data") {
                return 2;
            } else {
                return -1; // -1 indicates something went wrong
            }
        };
    }
}());