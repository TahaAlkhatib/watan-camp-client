import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Condition } from '@noah-ark/expression-engine';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, DynamicFormCommands, DynamicFormEvents, FormDesign, hiddenField, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { MembershipOptions, PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, of, ReplaySubject } from 'rxjs';
import { AppService } from '../../../providers/app.service';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private ls: LanguageService,
        public auth: AuthService,
        private appService: AppService) {

    }

    s = of(NaN)
    loading = new ReplaySubject<boolean>(1);

    @Input() model: { email: string, username: string, password: string } & any = {} as any;
    form: any
    signupBtn: ActionDescriptor = { variant: 'raised', name: 'submit', text: 'submit', color: 'primary' };
    formStyle: CollectStyle = 'linear';
    initialValueFactory: any;
    nextBtn: ActionDescriptor = { variant: 'flat', name: 'next', text: 'next', color: '' };
    prevBtn: ActionDescriptor = { variant: 'flat', name: 'prev', text: 'prev', color: '' };
    design: FormDesign = {
        verticalAlignment: 'center',
        horizontalAlignment: 'center'
    } as FormDesign;

    depAdapter = (ds, company) => new DataAdapter(new ServerDataSource(ds, `department`, ['_id', 'name', 'company']), '_id', 'name', '_id', undefined, { filter: { company: company } })


    conditions: Condition[] = [{
        on: DynamicFormEvents.valueChanged,
        when: e => e.payload.fields == "/company",
        do: [
            // e => new DynamicFormCommands.ChangeVisibility(["/approximateInGBP"], e.payload.value !== 'GBP'),
            (e) => {
                console.log(e);
                let depAdapter = this.depAdapter(this.ds, e.payload.value)
                return new DynamicFormCommands.ChangeInputs('/department', { adapter: depAdapter })
            }
        ]
    },]
    signupOptions = {
        formDesign: { questionColor: '#fff', answerColor: '#eee' } as FormDesign,
        formFields: {
            '_id': hiddenField('_id'),
            'name': textField('name', 'Name', undefined, undefined, undefined, [{ name: 'required' }]),
            'email': { type: 'field', input: 'email', name: 'email', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } }, validations: [{ name: 'required' }] },
            'password': { type: 'field', input: 'text', name: 'password', ui: { inputs: { label: 'Password', type: 'password', placeholder: 'Password', passwordStrength: null } }, validations: [{ name: 'required' }] },
            'company': selectField('company', 'Company', new DataAdapter(new ServerDataSource(this.ds, 'company', ['_id', 'name']), '_id', 'name', '_id'), null, null, null, 1, [{ name: 'required' }]),
            'department': selectField('department', 'Department', this.depAdapter(this.ds, ""), null, null, null, 1, [{ name: 'required' }]),
            'roles': selectField('roles', 'Roles', new DataAdapter(new ServerDataSource(this.ds, 'role', ['_id', 'name']), 'name', 'name', 'name'), null, null, null, 5, [{ name: 'required' }])
        },
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

    async ngOnInit() {
        const userId = this.route.snapshot.paramMap.get('id')
        if (userId) {
            const user = await firstValueFrom(this.ds.get('user', { _id: userId })) as any
            const _user = user[0]
            this.initialValueFactory = () => {
                return { email: _user.email, department: _user.department, _id: _user._id, company: _user.company, name: _user.name, roles: _user.roles }
            }
            delete this.signupOptions.formFields.password

        }
        this.form = this.signupOptions.formFields;
    }


    // async resetPassword(){
    //     await this.auth.reset_password('','')
    // }


    formchange() {
        console.log('changeed////');

    }


    async signup(model) {
        const roles = model.roles?.slice()
        delete this.model.roles
        try {
            if (model._id) {
                const res = await this.ds.put(`user/${model._id}`, model)
            }
            else {

                this.model = model;

                this.loading.next(true)
                if (!this.model.username) this.model.username = this.model.email; //auto save email as username if not provided

                const user: any = { ...this.model, language: this.ls.language };
                delete user.password;
                delete user.confirmPassword;
                let value = user;

                let res = await this.auth.signup(value, this.model.password);
                // let res2 = await this.auth.signin({ email: user.email, password: this.model.password });




            }

            let res = await this.appService.addUserToRoles(roles, this.model)
            this.model.roles = roles
            this.router.navigateByUrl('app/tabs/account/user-list')
        }
        catch (error) {

            if (error.status == 500) {
                const e = error.json ? error.json() : error.body;
                if (e.message && e.message.indexOf("duplicate key") > -1) {
                    if (e.message.indexOf("index: email") > -1) this.snack.openFailed('duplicate-email');
                    else if (e.message.indexOf("index: username") > -1) this.snack.openFailed('duplicate-username');
                    else if (e.message.indexOf("index: phone") > -1) this.snack.openFailed('duplicate-phone');
                    else this.snack.openFailed('not-saved');
                }
            }
            else this.snack.openFailed('not-saved');

        }
        finally {
            this.loading.next(false);
        }


    }

    save() {

    }


}
