import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { Camp } from '../../../../../app/model';
import { AppService } from '../../../../../app/providers/app.service';

@Component({
    selector: 'app-camp',
    templateUrl: './camp.component.html',
    styleUrls: ['./camp.component.css']
})
export class CampComponent implements OnInit {

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute) { }
    collection: string;
    item: Camp
    selection: Camp[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        name: 1, codePrefix: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'preview', icon: 'preview', menu: false },
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]
    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/camp', ['_id', 'name'])
        this.adapter = new DataAdapter(source, '_id', 'name')

    }

    ngAfterViewInit() {

        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Camp')
            await this.refresh()
        })
    }

    async refresh() {
        await this.ds.refreshCache('/camp')
        this.adapter.refresh()
    }
    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'preview':
                this.router.navigateByUrl(`en/admin/settings/camp/preview-camp/${x.data[0]._id}`)
                break;
            case 'create':
                this.router.navigateByUrl('en/admin/settings/camp/add-camp')
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/settings/camp/edit-camp/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`camp/${item._id}`)
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
