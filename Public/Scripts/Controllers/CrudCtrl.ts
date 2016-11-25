module TravelMonitoring.Controllers {
    export class CrudCtrl {
        entities: any[];
        entity: any;
        filters: any;
        query: any;
        service: any;
        paging: any;
        showForm: boolean;
        showFilter: boolean;

        constructor(scope, public notification) {
            this.filters = {};
            this.query = {};
            this.paging = { "page": 1, "max": 10, "total": 0 };
            this.showFilter = false;
            this.showForm = false;
        }

        filter(): void {
            this.paging.page = 1;
            this.load();
        }

        load(): void {
            var self = this;
            self.createQuery();

            self.service.GetAll(self.query).then(result => {
                self.entities = <Array<any>>result.data;
            }).catch(exception => {
                self.notify('error', exception.data);
            });
        }

        add(): void {
            this.entity = {};
            this.showForm = true;
        }

        edit(data: any): void {
            this.entity = data;
            this.showForm = true;
        }

        save(): void {
            var self = this;

            self.service.Save(self.entity).then(result => {
                self.load();
                self.notify('success', 'Data has been saved');
                self.showForm = false;
            }).catch(exception => {
                self.notify('error', exception.data);
            });
        }

        delete(id: any): void {
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

        createQuery(): void {
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

        cancelForm(): void {
            this.showForm = null;
            this.load();
        }

        next(): void {
            if (this.entities.length === 0)
                return;

            this.paging.page += 1;
            this.load();
        }

        prev(): void {
            if ((this.paging.page - 1) <= 0)
                return;

            this.paging.page -= 1;
            this.load();
        }

        notify(type: string, message: string): void {
            this.notification[type](message);
        }

        openCalendar(e, picker): void {
            this[picker].open = true;
        }
    }
}