import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { ReportBody } from 'src/app/model';
import { AppService } from '../../../../app/providers/app.service';



@Component({
    selector: 'report-items',
    templateUrl: './report-items.component.html',
    styleUrls: ['./report-items.component.scss']
})
export class ReportItemsComponent implements OnInit {

    section: string

    collection: string;
    item: ReportBody
    selection: ReportBody[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        section: 1, campId: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]

    constructor(public router: Router, public bus: EventBus, private confirmService: ConfirmService, private ds: DataService, private activatedRoute: ActivatedRoute, private appService: AppService) {
    }

    async ngOnInit() {



        this.activatedRoute.params.subscribe(async params => {
            this.section = params['section']
            this.appService.title.next(`Report Items/${this.section}`)

            let source = new ServerDataSource(this.ds, '/tournament', ['_id', 'section', 'campId'])
            this.adapter = new DataAdapter(source, '_id', 'section')
            this.adapter.filter = { 'section': this.section }
            
            await this.refresh()
        })


    }

    async refresh() {
        await this.ds.refreshCache('/tournament')
        this.adapter.refresh()
    }


    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'create':
                this.router.navigateByUrl('en/admin/report/add-report/' + this.section)
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/report/edit-report/${this.section}/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`tournament/${item._id}`)
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
