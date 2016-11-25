module TravelMonitoring.Controllers {
    class IndexCtrl {
        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            $scope.principal = principal;

            principal.identity().then((identity) => {
                $scope.identity = identity;
            });

            $scope.$state = $state;
        }
    }

    travelMonitoring.controller('IndexCtrl', IndexCtrl);
}