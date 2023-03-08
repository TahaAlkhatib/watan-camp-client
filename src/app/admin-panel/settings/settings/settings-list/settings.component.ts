import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { Settings } from '../../../../model';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute) { }
    collection: string;
    item: Settings
    selection: Settings[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        campId: 1, phone: 1, email: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'preview', icon: 'preview', menu: false },
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]
    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/settings', ['_id', 'campId', 'phone', 'email'])
        this.adapter = new DataAdapter(source, '_id', 'campId')

    }

    ngAfterViewInit() {

        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Settings')
            await this.refresh()
        })
    }

    async refresh() {
        await this.ds.refreshCache('/settings')
        this.adapter.refresh()
    }
    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'preview':
                this.router.navigateByUrl(`en/admin/settings/settings/preview-settings/${x.data[0]._id}`)
                break;
            case 'create':
                this.router.navigateByUrl('en/admin/settings/settings/add-settings')
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/settings/settings/edit-settings/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`'settings'/${item._id}`)
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
