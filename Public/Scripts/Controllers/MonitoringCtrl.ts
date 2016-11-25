module TravelMonitoring.Controllers {
    class MonitoringCtrl extends CrudCtrl {
        map: L.Map;
        center: L.LatLng;
        realtimeDate: Date;

        osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        satellite = L.tileLayer('//api.mapbox.com/styles/v1/{user}/{mapId}/tiles/256/{z}/{x}/{y}?access_token={apiKey}', {
            user: 'elesdoar',
            apiKey: 'pk.eyJ1IjoiZWxlc2RvYXIiLCJhIjoiY2l0bmcwaDNpMDQzMTJvbDRpaTltN2dlbiJ9.KDnhRVh9St6vpQovMI7iLg',
            mapId: 'citngqecv00362hphvm5m7myb'
        });

        static $inject = ['$scope', '$state', 'principal', 'Notification'];

        constructor(public $scope, public $state, principal, Notification) {
            super($scope, Notification);
            this.center = L.latLng(-6.24771, 106.9353617);
            this.createMap();
            this.entities = [];

            principal.identity().then((identity) => {
                this.createRealtime(identity);
            });
        }

        createMap(): void {
            this.map = L.map('map', { center: this.center, zoom: 12, zoomControl: false });
            L.control.layers({ "Osm": this.osm, "Satellite": this.satellite }).addTo(this.map);
            this.osm.addTo(this.map);
        }

        createRealtime(identity: any): void {
            angular.extend(this.query, { "token": identity.token });

            var realtime = L['realtime']({
                "url": TravelMonitoring.geoService + 'feature/getAll?query=' + JSON.stringify(this.query),
                "crossOrigin": true,
                "type": 'json'
            }, this.getRealtimeOption()).addTo(this.map);

            realtime.on('update', () => {
                this.$scope.$apply(() => {
                    this.realtimeDate = new Date();
                });
            });
        }

        getRealtimeOption(): any {
            return {
                "interval": 3000,
                "onEachFeature": (feature, layer) => {
                    var entity = this.entities.filter(e => e.feature._id === feature._id)[0];

                    if (!entity)
                        this.addEntity(feature, layer);
                },
                "getFeatureId": (feature) => {
                    return feature._id;
                }
            }
        }

        addEntity(feature, layer): void {
            Services.Client.GetByDevice(feature.device.model, feature.device.serial).then(result => {
                if (result.data !== '') {
                    var entity = result.data;

                    angular.extend(entity, { "marker": layer, "feature": feature });

                    layer.on('click', () => {
                        this.entity = entity;
                        $('#featureModal')['modal']('show');
                    });

                    this.entities.push(entity);
                }
            });
        }

        markerInfo(entity: any): void {
            this.entity = entity;
            var center = this.map.project(entity.marker._latlng, 16);
            this.map.setView(this.map.unproject(center, 16), 16, { animate: true });
        }
    }

    travelMonitoring.controller('MonitoringCtrl', MonitoringCtrl);
}