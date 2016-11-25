﻿module TravelMonitoring.Services {
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
}