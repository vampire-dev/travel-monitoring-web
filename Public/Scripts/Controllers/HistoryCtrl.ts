module TravelMonitoring.Controllers {
    class HistoryCtrl extends CrudCtrl {
        map: L.Map;
        client: any;
        collections: any;
        center: L.LatLng;
        from: any;
        to: any;
        marker: L.Marker;
        polyline: L.Polyline;
        tracking: boolean;
        counter: number;

        osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        satellite = L.tileLayer('https://api.mapbox.com/styles/v1/vampire13/civxpqmqe006z2jo5r3ata02a/tiles/256/{z}/{x}/{y}?access_token={apiKey}', {
            user: 'vampire13',
            apiKey: 'pk.eyJ1IjoidmFtcGlyZTEzIiwiYSI6ImNpdnhwa3M2azAyZHMydHRheHN4NDF6dXAifQ.inowv5XJuorxQA_fsWxciQ',
            mapId: 'mapbox.mapbox-streets-v7'
        });

        static $inject = ['$scope', '$stateParams', 'principal', 'Notification'];

        constructor(public $scope, public $stateParams, principal, Notification) {
            super($scope, Notification);

            this.from = { "open": false };
            this.to = { "open": false };
            this.tracking = false;
            this.counter = 0;

            $scope.intervalId = -1;

            this.center = L.latLng(-6.24771, 106.9353617);

            Services.Client.Get($stateParams.client).then(result => {
                this.client = result.data;
            });

            principal.identity().then((identity) => {
                this.createMap($stateParams.device, identity.token);
            });
        }

        createMap(device: any, token: any): void {
            angular.extend(this.query, { "device": device, "token": token });

            Services.Collection.GetAggregates(this.query).then(result => {
                this.collections = <Array<any>>result.data;

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

        start(): void {
            this.tracking = !this.tracking;

            if (!this.tracking) {
                this.stop();
                return;
            }

            var collections: any[] = angular.copy(this.collections);

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

        stop(): void {
            clearInterval(this.$scope.intervalId);
            this.$scope.intervalId = -1;
        }
    }

    travelMonitoring.controller('HistoryCtrl', HistoryCtrl);
}