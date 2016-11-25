/// <reference path="../../typings/tsd.d.ts" />
var TravelMonitoring;
(function (TravelMonitoring) {
    TravelMonitoring.travelMonitoring = angular.module('travelMonitoring', ['ui.router',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'angular-loading-bar',
        'ui-notification',
        'bw.paging']);
    TravelMonitoring.root = '/travel-monitoring';
    TravelMonitoring.service = '/travel-monitoring/ws/';
    TravelMonitoring.geoService = 'http://service.ciaoindonesia.com/travel-monitoring-service/ws/';
    var principal = ($q, $http, $timeout) => {
        var _identity = undefined;
        var _authenticated = false;
        return {
            isIdentityResolved: () => {
                return angular.isDefined(_identity);
            },
            isAuthenticated: () => {
                return _authenticated;
            },
            authenticate: (identity) => {
                _identity = identity;
                _authenticated = identity != null;
            },
            identity: (force) => {
                var deferred = $q.defer();
                if (force === true)
                    _identity = undefined;
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);
                    return deferred.promise;
                }
                $http.get(TravelMonitoring.service + 'user/getIdentity').then((response) => {
                    if (response.data) {
                        _identity = response.data;
                        _authenticated = true;
                    }
                    deferred.resolve(_identity);
                }).catch(() => {
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                });
                return deferred.promise;
            }
        };
    };
    TravelMonitoring.travelMonitoring.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
            ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
            $urlRouterProvider.otherwise(TravelMonitoring.root);
            $locationProvider.html5Mode({ enabled: true });
            $httpProvider.interceptors.push('responseObserver');
            $stateProvider.state('site', {
                abstract: true,
                template: '<ui-view />',
                resolve: {
                    authorize: ['authorization', (authorization) => {
                            return authorization.authorize();
                        }]
                }
            }).state('site.login', {
                url: TravelMonitoring.root + '/login',
                templateUrl: TravelMonitoring.root + '/views/login.html',
                controller: 'LoginCtrl as ctrl'
            }).state('site.main', {
                url: TravelMonitoring.root,
                templateUrl: TravelMonitoring.root + '/views/main.html',
                controller: 'IndexCtrl as ctrl'
            }).state('site.main.client', {
                url: '/client',
                templateUrl: TravelMonitoring.root + '/views/client.html',
                controller: 'ClientCtrl as ctrl'
            }).state('site.main.monitoring', {
                url: '/monitoring',
                templateUrl: TravelMonitoring.root + '/views/monitoring.html',
                controller: 'MonitoringCtrl as ctrl'
            }).state('site.main.history', {
                url: '/history?client&device',
                templateUrl: TravelMonitoring.root + '/views/history.html',
                controller: 'HistoryCtrl as ctrl'
            });
        }]);
    var authorization = ($rootScope, $state, $location, principal) => {
        return {
            authorize: () => {
                return principal.identity().then(function () {
                    var isAuthenticated = principal.isAuthenticated();
                    if (!isAuthenticated && $rootScope.toState.name !== 'site.login') {
                        $rootScope.returnToState = $rootScope.toState;
                        $rootScope.returnToStateParams = $rootScope.toStateParams;
                        $state.go('site.login');
                    }
                });
            }
        };
    };
    var run = ($rootScope, $state, $stateParams, authorization, principal, $http) => {
        TravelMonitoring.http = $http;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (principal.isIdentityResolved())
                authorization.authorize();
        });
    };
    TravelMonitoring.travelMonitoring.factory('responseObserver', ['$q', '$location', function responseObserver($q, $location) {
            return {
                'responseError': function (errorResponse) {
                    switch (errorResponse.status) {
                        case 401:
                            $location.path(TravelMonitoring.root + '/login');
                            break;
                    }
                    return $q.reject(errorResponse);
                }
            };
        }]);
    TravelMonitoring.travelMonitoring.directive('toNumber', () => {
        return {
            require: 'ngModel',
            link: (scope, element, attrs, ngModel) => {
                ngModel.$parsers.push((val) => {
                    return parseFloat(val);
                });
                ngModel.$formatters.push((val) => {
                    return '' + val;
                });
            }
        };
    });
    TravelMonitoring.travelMonitoring.factory('principal', ['$q', '$http', '$timeout', principal]);
    TravelMonitoring.travelMonitoring.factory('authorization', ['$rootScope', '$state', '$location', 'principal', authorization]);
    TravelMonitoring.travelMonitoring.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal', '$http', run]);
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=TravelMonitoring.js.map