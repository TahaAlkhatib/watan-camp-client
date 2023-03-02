import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, hiddenField, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Department } from '../../../../model';

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);

    model: Department
    formFields = {
        '_id': hiddenField('_id'),
        'name': { type: 'field', input: 'text', name: 'name', ui: { inputs: { label: 'name', placeholder: 'name' } }, validations: [{ name: 'required' }] },
        'nameAr': { type: 'field', input: 'text', name: 'nameAr', ui: { inputs: { label: 'Name Arabic', placeholder: 'Name Arabic' } }, validations: [{ name: 'required' }] }
    }
    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        public auth: AuthService) {
    }

    async ngOnInit() {
        const departmentId = this.route.snapshot.paramMap.get('id')
        if (departmentId) {
            this.model = await firstValueFrom(this.ds.get<Department>(`department/${departmentId}`))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`department/${this.model._id}`, this.model)

        }
        else {
            const res = await this.ds.post('department', this.model)
        }

        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/settings/department/department-list')
    }

    goBack() {
        window.history.back()
    }
}
