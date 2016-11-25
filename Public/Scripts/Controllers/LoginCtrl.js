var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class LoginCtrl {
            constructor($scope, $state, principal, $location, Notification) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                this.$location = $location;
                this.Notification = Notification;
            }
            login() {
                var principal = this.principal;
                var scope = this.$scope;
                var state = this.$state;
                var location = this.$location;
                var notification = this.Notification;
                TravelMonitoring.Services.User.Login(this.user).then(response => {
                    principal.authenticate(response.data);
                    var params = location.search();
                    if (params.redir)
                        window.location.href = window.location.protocol + "//" + window.location.host + params.redir;
                    else if (scope.returnToState)
                        state.go(scope.returnToState.name, scope.returnToStateParams);
                    else
                        state.go('site.main');
                }).catch(exception => {
                    notification.error(exception.data);
                });
            }
            logout() {
                TravelMonitoring.Services.User.Logout();
                this.principal.authenticate(null);
                this.$state.go('site.login');
            }
        }
        LoginCtrl.$inject = ['$scope', '$state', 'principal', '$location', 'Notification'];
        TravelMonitoring.travelMonitoring.controller('LoginCtrl', LoginCtrl);
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=LoginCtrl.js.map