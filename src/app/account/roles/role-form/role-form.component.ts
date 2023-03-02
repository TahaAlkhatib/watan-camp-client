import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, hiddenField, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Role } from '../../../model';

@Component({
    selector: 'role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);

    model: Role
    formFields= {
        '_id': { type: 'field', input: 'hidden', name: '_id', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } } },
        'name': { type: 'field', input: 'text', name: 'name', ui: { inputs: { label: 'name', placeholder: 'name' } }, validations: [{ name: 'required' }] }
    }
    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private ls: LanguageService,
        public auth: AuthService) {
    }

    async ngOnInit() {
        const roleId = this.route.snapshot.paramMap.get('id')
        if (roleId) {
             this.model = await firstValueFrom(this.ds.get<Role>(`role/${roleId}`))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`role/${this.model._id}`, this.model)

        }
        else {
            const res = await this.ds.post('role', this.model)
        }
        this.snack.openSuccess()
        this.router.navigateByUrl('en/account/role/role-list')
    }

    goBack(){
        window.history.back()
    }

}
