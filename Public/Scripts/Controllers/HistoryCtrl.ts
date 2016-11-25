module TravelMonitoring.Controllers {
    class HistoryCtrl extends CrudCtrl {
        static $inject = ['$scope', '$stateParams', 'Notification'];

        constructor($scope, $stateParams, Notification) {
            super($scope, Notification);
        }
    }

    travelMonitoring.controller('HistoryCtrl', HistoryCtrl);
}