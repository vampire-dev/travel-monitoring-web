var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class HistoryCtrl extends Controllers.CrudCtrl {
            constructor($scope, $stateParams, Notification) {
                super($scope, Notification);
            }
        }
        HistoryCtrl.$inject = ['$scope', '$stateParams', 'Notification'];
        TravelMonitoring.travelMonitoring.controller('HistoryCtrl', HistoryCtrl);
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=HistoryCtrl.js.map