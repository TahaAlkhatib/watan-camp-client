import { Injectable } from "@angular/core";
import { AuthService } from "@upupa/auth";
import { DataService } from "@upupa/data";
import { firstValueFrom } from "rxjs";
import { AppPage, PermissionRecord } from "../model";

@Injectable({ providedIn: 'root' })
export class PermissionsService {

    adminPages: AppPage[] = [
        {
            text: 'Awareness',
            section: 'awareness',
            children: [
                {
                    text: 'Human Rights Manual',
                    section: 'awhum'
                },
                {
                    text: 'Refugees Manual',
                    section: 'awref'
                },
                {
                    text: 'Women Rights Manual',
                    section: 'awwom'
                },
                {
                    text: 'Childhood Manual',
                    section: 'awchi'
                },
                {
                    text: 'Public Health Manual',
                    section: 'awpub'
                },
                {
                    text: 'Hygiene Manual',
                    section: 'awhyg'
                },
                {
                    text: 'Workers Rights Manual',
                    section: 'awwor'
                },
                {
                    text: 'Social Cohesion manual',
                    section: 'awsoc'
                },
                {
                    text: 'Emergency contacts',
                    section: 'aweme'
                },
                {
                    text: 'Reporting harassment, exploitation and abuse',
                    section: 'awrep'
                }

            ]
        }, {
            text: 'BENs',
            section: 'BENs',
            children: [
                {
                    text: 'Contact Camp Management',
                    section: 'becon'
                },
                {
                    text: 'Camp location',
                    section: 'becam'
                },
                {
                    text: 'Emergency contacts',
                    section: 'beeme'
                },
                {
                    text: 'Health care',
                    section: 'behea'
                },
                {
                    text: 'Learning and training',
                    section: 'belea'
                },
                {
                    text: 'WATAN services',
                    section: 'bewat'
                },
                {
                    text: 'Local and International News',
                    section: 'beloc'
                }


            ]
        },
        {
            text: 'Account',
            section: 'account',
            children: [
                {
                    text: 'Users',
                    section: 'user-list'
                },
                {
                    text: 'Roles',
                    section: 'role-list'
                }
            ]
        },
        {
            text: 'Settings',
            section: 'settings',
            children: [
                {
                    text: 'Camp',
                    section: 'camp-list'
                },
                {
                    text: 'Department',
                    section: 'department-list'
                },
                {
                    text: 'Settings',
                    section: 'settings-list'
                }
            ]
        }
    ];

    adminPermissions: PermissionRecord[] = []
    clientPermissions: PermissionRecord[] = []

    constructor(private ds: DataService, private auth: AuthService) {

    }


    async getPermissionRecords() {
        this.adminPermissions = await firstValueFrom(this.ds.get<PermissionRecord[]>(`permissionrecord`, { app: 'admin' }))
        this.clientPermissions = await firstValueFrom(this.ds.get<PermissionRecord[]>(`permissionrecord`, { app: 'client' }))
    }


    async savePermissionRecord(record: PermissionRecord) {
        if (record._id) {
            await this.ds.put(`permissionrecord/${record._id}`, record)
        } else {
            await this.ds.post('permissionrecord', record)
        }
    }

    getPermissionRecord(section: string, app: 'client' | 'admin') {
        return app == 'client' ? this.clientPermissions.find(x => x.section == section) : this.adminPermissions.find(x => x.section == section)
    }

    async checkPermission(section: string, app: 'client' | 'admin') {
        let record = this.getPermissionRecord(section, app)
        if (!record?.roles?.length) return true

        return record.roles.some(r => this.auth.user?.roles?.some(x => x == r))
    }


    getAdminRecords() {
        let records: PermissionRecord[] = []
        this.adminPages.forEach(p => {
            let record = this.adminPermissions?.find(x => x.section == p.section)
            if (!record) record = { action: 'read', app: 'admin', roles: [], section: p.section, _id: undefined }

            records.push(record)
        });
        return records
    }





}