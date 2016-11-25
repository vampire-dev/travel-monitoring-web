module TravelMonitoring.Controllers {
    class ClientCtrl extends CrudCtrl {
        registrationDate: any;
        birthDate: any;

        static $inject = ['$scope', 'Notification'];

        constructor($scope, Notification) {
            super($scope, Notification);
            this.registrationDate = { "open": false };
            this.birthDate = { "open": false };
            this.service = Services.Client;
            this.load();
        }
    }

    travelMonitoring.controller('ClientCtrl', ClientCtrl);
}