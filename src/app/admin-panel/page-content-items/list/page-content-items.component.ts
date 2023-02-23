import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { ContentItems } from 'src/app/model';
import { AppService } from '../../../../app/providers/app.service';



@Component({
    selector: 'page-content-items',
    templateUrl: './page-content-items.component.html',
    styleUrls: ['./page-content-items.component.scss']
})
export class PageContentItemsComponent implements OnInit {

    section: string

    collection: string;
    item: ContentItems
    selection: ContentItems[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        section: 1, campId: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'preview', icon: 'preview', menu: false },
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]

    constructor(public router: Router, public bus: EventBus,private confirmService: ConfirmService,private ds: DataService,private activatedRoute: ActivatedRoute, private appService: AppService) {
    }

    async ngOnInit() {
        let source = new ServerDataSource(this.ds, '/contentitems', ['_id', 'section','campId'])
        this.adapter = new DataAdapter(source, '_id', 'section')


        this.activatedRoute.params.subscribe(async params => {
            this.section = params['section']
            this.appService.title.next(`Content Items/${this.section}`)
            await this.refresh()
        })

        
    }

    async refresh() {
        await this.ds.refreshCache('/contentitems')
        this.adapter.refresh()
    }


    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'preview':
                this.router.navigateByUrl(`en/admin/contentitems/preview-contentitems/${this.section}/${x.data[0]._id}`)
                break;
            case 'create':
                this.router.navigateByUrl('en/admin/contentitems/add-contentitems/'+this.section)
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/contentitems/edit-contentitems/${this.section}/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`contentitems/${item._id}`)
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
