var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class HistoryCtrl extends Controllers.CrudCtrl {
            constructor($scope, $stateParams, principal, Notification) {
                super($scope, Notification);
                this.$scope = $scope;
                this.$stateParams = $stateParams;
                this.osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                });
                this.satellite = L.tileLayer('https://api.mapbox.com/styles/v1/vampire13/civxpqmqe006z2jo5r3ata02a/tiles/256/{z}/{x}/{y}?access_token={apiKey}', {
                    user: 'vampire13',
                    apiKey: 'pk.eyJ1IjoidmFtcGlyZTEzIiwiYSI6ImNpdnhwa3M2azAyZHMydHRheHN4NDF6dXAifQ.inowv5XJuorxQA_fsWxciQ',
                    mapId: 'mapbox.mapbox-streets-v7'
                });
                this.from = { "open": false };
                this.to = { "open": false };
                this.tracking = false;
                this.counter = 0;
                $scope.intervalId = -1;
                this.center = L.latLng(-6.24771, 106.9353617);
                TravelMonitoring.Services.Client.Get($stateParams.client).then(result => {
                    this.client = result.data;
                });
                principal.identity().then((identity) => {
                    this.createMap($stateParams.device, identity.token);
                });
            }
            createMap(device, token) {
                angular.extend(this.query, { "device": device, "token": token });
                TravelMonitoring.Services.Collection.GetAggregates(this.query).then(result => {
                    this.collections = result.data;
                    this.center = L.latLng([this.collections[0].features.geometry.coordinates[1],
                        this.collections[0].features.geometry.coordinates[0]]);
                }).finally(() => {
                    this.map = L.map('map', { center: this.center, zoom: 12, zoomControl: false });
                    L.control.layers({ "Osm": this.osm, "Satellite": this.satellite }).addTo(this.map);
                    this.osm.addTo(this.map);
                    this.marker = L.marker(this.center).addTo(this.map);
                    this.polyline = L.polyline([this.center]).addTo(this.map);
                    this.marker['date'] = this.collections[0].features.properties.date;
                });
            }
            start() {
                this.tracking = !this.tracking;
                if (!this.tracking) {
                    this.stop();
                    return;
                }
                var collections = angular.copy(this.collections);
                if (this.filters.from && this.filters.to) {
                    var from = new Date(this.filters.from);
                    var to = new Date(this.filters.to);
                    collections = collections.filter(e => new Date(e.features.properties.date) >= from
                        && new Date(e.features.properties.date) <= to);
                }
                this.$scope.intervalId = setInterval(() => {
                    if (this.counter === 0) {
                        this.marker.setLatLng(this.center);
                        this.polyline.setLatLngs([this.center]);
                    }
                    if (this.counter > collections.length - 1) {
                        this.$scope.$apply(() => {
                            this.stop();
                            this.counter = 0;
                            this.tracking = false;
                        });
                        return;
                    }
                    this.$scope.$apply(() => {
                        var lat = collections[this.counter].features.geometry.coordinates[1];
                        var lng = collections[this.counter].features.geometry.coordinates[0];
                        if (lat && lng) {
                            this.polyline.addLatLng([lat, lng]);
                            this.marker.setLatLng(L.latLng(lat, lng));
                            this.marker['date'] = collections[this.counter].features.properties.date;
                        }
                    });
                    this.counter++;
                }, 2000);
            }
            stop() {
                clearInterval(this.$scope.intervalId);
                this.$scope.intervalId = -1;
            }
        }
        HistoryCtrl.$inject = ['$scope', '$stateParams', 'principal', 'Notification'];
        TravelMonitoring.travelMonitoring.controller('HistoryCtrl', HistoryCtrl);
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=HistoryCtrl.js.map