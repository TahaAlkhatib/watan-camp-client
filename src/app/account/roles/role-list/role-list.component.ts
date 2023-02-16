import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { Role } from '../../../model';
import { AppService } from '../../../providers/app.service';

@Component({
    selector: 'role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute) { }
    collection: string;
    item: Role
    selection: Role[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        name: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]
    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/role', ['_id', 'name'])
        this.adapter = new DataAdapter(source, 'name')

    }



    ngAfterViewInit() {
        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Role')
            await this.refresh()
        })
    }
    async refresh() {
        await this.ds.refreshCache('/role')
        this.adapter.refresh()
    }
    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'create':
                this.router.navigateByUrl('app/tabs/account/role/add-role')
                break;
            case 'edit': this.router.navigateByUrl(`app/tabs/account/role/edit-role/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`role/${item._id}`)
                        await this.refresh()
                }
                break;
            default:
                this.bus.emit(`${this.collection}_${x.action.name}`, {
                    msg: `${this.collection}_${x.action.name}`,
                    ...x
                }, this)
                break;
        }


    }
}
