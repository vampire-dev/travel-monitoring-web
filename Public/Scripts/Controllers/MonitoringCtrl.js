var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class MonitoringCtrl extends Controllers.CrudCtrl {
            constructor($scope, $state, Notification) {
                super($scope, Notification);
            }
        }
        MonitoringCtrl.$inject = ['$scope', '$state', 'Notification'];
        TravelMonitoring.travelMonitoring.controller('MonitoringCtrl', MonitoringCtrl);
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=MonitoringCtrl.js.map