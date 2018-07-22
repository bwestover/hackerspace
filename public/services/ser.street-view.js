(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('jStreetViewService', [
        '$rootScope', '$http', StreetViewClass
    ]);


    function StreetViewClass($rootScope, $http) {
        let path = 'http://localhost/sv2/?';
        // devPath = 'http://localhost/sv2/?';
        // proPath = 'https://maps.mhetadata.com/sv2/?';

        const getTableToPresent = function () {
            return $http.get(path + 'get_uri=present');
        };

        const startTableQuery = function (table, svId) {
            let eTable = encodeURIComponent(table);
            let eSvId = encodeURIComponent(svId);

            return $http.get('');
        };

        return {
            getTableToPresent: getTableToPresent
        }
    }

})();