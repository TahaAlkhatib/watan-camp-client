import { Component, OnInit } from '@angular/core';
import { PermissionRecord } from 'src/app/model';
import { PermissionsService } from 'src/app/providers/permissions.service';



@Component({
    selector: 'admin-permissions-component',
    templateUrl: './admin-permissions.component.html',
    styleUrls: ['./admin-permissions.component.scss']
})
export class AdminPermissionsComponent implements OnInit {

    records: PermissionRecord[] = []

    constructor(private permissionService:PermissionsService) {
    }

    async ngOnInit() {



    }

}
