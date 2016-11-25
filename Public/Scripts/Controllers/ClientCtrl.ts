module TravelMonitoring.Controllers {
    class ClientCtrl extends CrudCtrl {
        static $inject = ['$scope', 'Notification'];

        constructor($scope, Notification) {
            super($scope, Notification);
            this.service = Services.Client;
            this.load();
        }
    }

    travelMonitoring.controller('ClientCtrl', ClientCtrl);
}