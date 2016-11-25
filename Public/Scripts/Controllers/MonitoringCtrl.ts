module TravelMonitoring.Controllers {
    class MonitoringCtrl extends CrudCtrl {
        static $inject = ['$scope', '$state', 'Notification'];

        constructor($scope, $state, Notification) {
            super($scope, Notification);
        }
    }

    travelMonitoring.controller('MonitoringCtrl', MonitoringCtrl);
}