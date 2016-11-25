var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class IndexCtrl {
            constructor($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                $scope.principal = principal;
                principal.identity().then((identity) => {
                    $scope.identity = identity;
                });
                $scope.$state = $state;
            }
        }
        IndexCtrl.$inject = ['$scope', '$state', 'principal'];
        TravelMonitoring.travelMonitoring.controller('IndexCtrl', IndexCtrl);
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=IndexCtrl.js.map