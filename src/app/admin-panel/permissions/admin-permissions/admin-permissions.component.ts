import { Component, OnInit } from '@angular/core';
import { AppPage, PermissionRecord, Role } from '../../../model';
import { PermissionsService } from 'src/app/providers/permissions.service';
import { AppService } from '../../../providers/app.service';
import { SnackBarService } from '@upupa/common';



@Component({
    selector: 'admin-permissions-component',
    templateUrl: './admin-permissions.component.html',
    styleUrls: ['./admin-permissions.component.scss']
})
export class AdminPermissionsComponent implements OnInit {

    records: PermissionRecord[] = []

    pages: AppPage[] = []

    roles: Role[] = []

    constructor(private permissionService: PermissionsService, private appService: AppService, private snackbar: SnackBarService) {
    }

    async ngOnInit() {

        this.records = this.permissionService.getAdminPagesRecords()
        this.pages = this.permissionService.adminPages
        this.roles = await this.appService.getRoles()
        this.pages.forEach(p => {
            p.record = this.records.find(r => r.section == p.section)
            if (p.children?.length)
                p.children.forEach(c => {
                    c.record = this.records.find(r => r.section == c.section)
                })
        })

    }

    submit() {
        this.records.forEach(async r => {
            await this.permissionService.savePermissionRecord(r)
        })
        this.snackbar.openSuccess('saved !!')
    }

}
