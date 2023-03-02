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

    @Input() model: { email: string, username: string, password: string } & any = {} as any;
    form: any
    submitBtn: ActionDescriptor = { variant: 'raised', name: 'submit', text: 'submit', color: 'primary' };
    formStyle: CollectStyle = 'linear';
    initialValueFactory: any;
    nextBtn: ActionDescriptor = { variant: 'flat', name: 'next', text: 'next', color: '' };
    prevBtn: ActionDescriptor = { variant: 'flat', name: 'prev', text: 'prev', color: '' };
    design: FormDesign = {
        verticalAlignment: 'center',
        horizontalAlignment: 'center'
    } as FormDesign;

    formOptions = {
        formDesign: { questionColor: '#fff', answerColor: '#eee' } as FormDesign,
        formFields: [
            hiddenField('_id'),
            textField('name', 'Name', 'Name', null, null, [{ name: 'required' }]),
            selectField('company', 'Company', new DataAdapter(new ServerDataSource(this.ds, '/company', ['_id', 'name']), '_id', 'name', '_id')),
            textField('codePrefix', 'Code Prefix', null, null, null, [{ name: 'required' }])
        ],
        formStyle: 'linear',
        successHandler: {
            onSuccess: (auth, router) => {
                return router.navigateByUrl('/')
            }
        },
        links: (languageService: LanguageService, route: ActivatedRoute) => {
            return [{ label: 'signin-label', text: 'signin-text', url: `/${languageService.language}/account/signin` } as PageNavigationLink]
        }
    }
    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        public auth: AuthService) {
        this.form = this.formOptions.formFields;
    }

    async ngOnInit() {
        const departmentId = this.route.snapshot.paramMap.get('id')
        if (departmentId) {
            const department = await firstValueFrom(this.ds.get<Department>(`department/${departmentId}`))
            this.initialValueFactory = () => {
                return { name: department.name, _id: department._id, nameAr: department.nameAr }
            }

        }
    }
    async submit(model) {
        if (model._id) {
            const res = await this.ds.put(`department/${model._id}`, model)

        }
        else {
            const res = await this.ds.post('department', model)
        }

        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/settings/department/department-list')
    }
}
