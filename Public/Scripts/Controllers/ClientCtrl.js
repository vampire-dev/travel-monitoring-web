var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class ClientCtrl extends Controllers.CrudCtrl {
            constructor($scope, Notification) {
                super($scope, Notification);
                this.service = TravelMonitoring.Services.Client;
                this.load();
            }
        }
        ClientCtrl.$inject = ['$scope', 'Notification'];
        TravelMonitoring.travelMonitoring.controller('ClientCtrl', ClientCtrl);
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=ClientCtrl.js.map