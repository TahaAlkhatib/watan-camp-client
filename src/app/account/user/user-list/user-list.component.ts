import { Component, OnInit } from '@angular/core';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppService } from '../../../providers/app.service';
import { User } from '@upupa/auth';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    path = '/user'
    collection: string;
    item: User
    selection: User[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        name: 1, email: 1, department: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'edit', icon: 'edit', menu: false },
        { variant: 'icon', name: 'password', icon: 'password', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]

    constructor(private ds: DataService, public bus: EventBus,private http: HttpClient,
        private confirmService: ConfirmService, public router: Router,private activatedRoute:ActivatedRoute,private appService:AppService) { }

    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/user', ['_id', 'name', 'email', 'department'])
        this.adapter = new DataAdapter(source, 'email', 'name')
    }


    ngAfterViewInit() {

        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Users')
            await this.refresh()
        })
    }

    async refresh() {
        await this.ds.refreshCache('/user')
        this.adapter.refresh()
    }


    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'password':
                await firstValueFrom(this.http.post(`${environment.server_base_url}/auth/adminreset`,{email:x.data[0].email, new_password:'Master123'})) 
                break
            case 'create':
                this.router.navigateByUrl('app/tabs/account/add-user')
                break;
            case 'edit': this.router.navigateByUrl(`app/tabs/account/edit-user/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`${'user'}/${item._id}`)
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

    private async openFormDialog(collection: string, payload: ActionEvent) {
        // const id = payload.data?.length > 0 ? payload.data[0]._id : null;
        // const scaffolder = await this.scaffolder.scaffold('/' + [payload.action.name, collection, id].filter(s => s).join('/'))
        // const formResolverResult = (isObservable(scaffolder) ? await firstValueFrom(scaffolder) : await scaffolder) as DataFormResolverResult<any>

        // const actions = [...(formResolverResult.formViewModel.actions ?? []), formResolverResult.formViewModel.submitBtn]

        // const res = await firstValueFrom(this.dialog.openDialog(DataFormComponent, {
        //     maxHeight: '90vh',
        //     width: '90%',
        //     maxWidth: '700px',
        //     closeOnNavigation: true,
        //     direction: languageDir(this.languageService.language),
        //     data: {
        //         actions: actions,
        //         title: payload.action.name + ' ' + collection,
        //         inputs: { formResolverResult: scaffolder }
        //     }
        // }).afterClosed());

        // if (res) this.inputs.adapter.refresh();
    }

}
