import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { Complaint } from '../../../../app/model';
import { AppService } from '../../../../app/providers/app.service';
import * as XLSX from "xlsx";
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-complaint',
    templateUrl: './complaint.component.html',
    styleUrls: ['./complaint.component.css']
})
export class ComplaintListComponent implements OnInit {

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute) { }
    collection: string;
    item: Complaint
    selection: Complaint[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        fullName: 1, subject: 1, email: 1, phone: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'preview', icon: 'preview', menu: false },
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        // { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true },
        { position: 'header', name: 'export', icon: 'article_outline', text: 'Export To Excel', bulk: true }
    ]
    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/complaint', ['_id', 'fullName', 'email', 'phone', 'subject'])
        this.adapter = new DataAdapter(source, '_id', 'fullName')

    }

    ngAfterViewInit() {

        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Complaint')
            await this.refresh()
        })
    }

    async refresh() {
        await this.ds.refreshCache('/complaint')
        this.adapter.refresh()
    }
    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'preview':
                this.router.navigateByUrl(`en/admin/complaint/preview-complaint/${x.data[0]._id}`)
                break;
            case 'create':
                this.router.navigateByUrl('en/admin/complaint/add-complaint')
                break;
            case 'export':
                await this.exportToExcel()
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/complaint/edit-complaint/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`complaint/${item._id}`)
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

    async exportToExcel() {
        let complaints: Complaint[] = await firstValueFrom(this.ds.get<Complaint[]>('complaint', { per_page: 9999999 }))

        let ws = XLSX.utils.json_to_sheet(complaints)
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'complaints.xlsx')


    }
}
