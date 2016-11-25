var TravelMonitoring;
(function (TravelMonitoring) {
    var Services;
    (function (Services) {
        class User {
            static Get(id) {
                return TravelMonitoring.http.get(TravelMonitoring.service + 'user/get?id=' + id);
            }
            static GetAll(query) {
                return TravelMonitoring.http.get(TravelMonitoring.service + 'user/getAll?query=' + JSON.stringify(query));
            }
            static Save(data) {
                return TravelMonitoring.http.post(TravelMonitoring.service + 'user/save', JSON.stringify(data));
            }
            static Delete(id) {
                return TravelMonitoring.http.delete(TravelMonitoring.service + 'user/delete?id=' + id);
            }
            static Login(data) {
                return TravelMonitoring.http.post(TravelMonitoring.service + 'user/authenticate', data);
            }
            static Logout() {
                return TravelMonitoring.http.get(TravelMonitoring.service + 'user/logout');
            }
        }
        Services.User = User;
        class Client {
            static Get(id) {
                return TravelMonitoring.http.get(TravelMonitoring.service + 'client/get?id=' + id);
            }
            static GetAll(query) {
                return TravelMonitoring.http.get(TravelMonitoring.service + 'client/getAll?query=' + JSON.stringify(query));
            }
            static Save(data) {
                return TravelMonitoring.http.post(TravelMonitoring.service + 'client/save', JSON.stringify(data));
            }
            static Delete(id) {
                return TravelMonitoring.http.delete(TravelMonitoring.service + 'client/delete?id=' + id);
            }
        }
        Services.Client = Client;
    })(Services = TravelMonitoring.Services || (TravelMonitoring.Services = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=Services.js.map