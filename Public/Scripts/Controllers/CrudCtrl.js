var TravelMonitoring;
(function (TravelMonitoring) {
    var Controllers;
    (function (Controllers) {
        class CrudCtrl {
            constructor(scope, notification) {
                this.notification = notification;
                this.filters = {};
                this.query = {};
                this.paging = { "page": 1, "max": 10, "total": 0 };
                this.showFilter = false;
                this.showForm = false;
            }
            filter() {
                this.paging.page = 1;
                this.load();
            }
            load() {
                var self = this;
                self.createQuery();
                self.service.GetAll(self.query).then(result => {
                    self.entities = result.data;
                }).catch(exception => {
                    self.notify('error', exception.data);
                });
            }
            add() {
                this.entity = {};
                this.showForm = true;
            }
            edit(data) {
                this.entity = data;
                this.showForm = true;
            }
            save() {
                var self = this;
                self.service.Save(self.entity).then(result => {
                    self.load();
                    self.notify('success', 'Data has been saved');
                    self.showForm = false;
                }).catch(exception => {
                    self.notify('error', exception.data);
                });
            }
            delete(id) {
                var isConfirmed = confirm('Data will be deleted, are you sure?');
                if (!isConfirmed)
                    return;
                var self = this;
                self.service.Delete(id).then(result => {
                    self.load();
                    self.notify('success', 'Data has been deleted');
                }).catch(exception => {
                    self.notify('error', exception.data);
                });
            }
            createQuery() {
                this.query = {};
                this.query['limit'] = this.paging.max;
                this.query['skip'] = (this.paging.page - 1) * this.paging.max;
                var keys = Object.keys(this.filters);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (this.filters[key] && this.filters[key]['_id'])
                        this.query[key] = this.filters[key]['_id'];
                    else
                        this.query[key] = this.filters[key];
                }
            }
            cancelForm() {
                this.showForm = null;
                this.load();
            }
            next() {
                if (this.entities.length === 0)
                    return;
                this.paging.page += 1;
                this.load();
            }
            prev() {
                if ((this.paging.page - 1) <= 0)
                    return;
                this.paging.page -= 1;
                this.load();
            }
            notify(type, message) {
                this.notification[type](message);
            }
            openCalendar(e, picker) {
                this[picker].open = true;
            }
        }
        Controllers.CrudCtrl = CrudCtrl;
    })(Controllers = TravelMonitoring.Controllers || (TravelMonitoring.Controllers = {}));
})(TravelMonitoring || (TravelMonitoring = {}));
//# sourceMappingURL=CrudCtrl.js.map