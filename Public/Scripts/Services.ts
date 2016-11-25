module TravelMonitoring.Services {
    export class User {
        static Get(id: any) {
            return http.get(service + 'user/get?id=' + id);
        }

        static GetAll(query: any) {
            return http.get(service + 'user/getAll?query=' + JSON.stringify(query));
        }

        static Save(data: any) {
            return http.post(service + 'user/save', JSON.stringify(data));
        }

        static Delete(id: any) {
            return http.delete(service + 'user/delete?id=' + id);
        }

        static Login(data: any) {
            return http.post(service + 'user/authenticate', data);
        }

        static Logout() {
            return http.get(service + 'user/logout');
        }
    }

    export class Client {
        static Get(id: any) {
            return http.get(service + 'client/get?id=' + id);
        }

        static GetAll(query: any) {
            return http.get(service + 'client/getAll?query=' + JSON.stringify(query));
        }

        static GetByDevice(model: string, serial: string) {
            return http.get(service + 'client/getByDevice?model=' + model + '&serial=' + serial);
        }

        static Save(data: any) {
            return http.post(service + 'client/save', JSON.stringify(data));
        }

        static Delete(id: any) {
            return http.delete(service + 'client/delete?id=' + id);
        }
    }
}