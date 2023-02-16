import { NgModule } from '@angular/core';
import { MembershipModule, PageNavigationLink } from '@upupa/membership';
import { DynamicFormModule, FormDesign, hiddenField, selectField, switchField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { ActivatedRoute } from '@angular/router';
import { ClientDataSource, DataAdapter, ServerDataSource } from '@upupa/data';
import { DataTableModule } from '@upupa/table';
import { UserFormComponent } from './user/user-update/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MaterialModulesModule } from '../app-material.module';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleFormComponent } from './roles/role-form/role-form.component';
import { IonicModule } from '@ionic/angular';
import { AcountsRouterModule } from './account-routing.module';


const loginOptions = {
    formDesign: { questionColor: '#fff', answerColor: '#eee' } as FormDesign,
    formFields: [
        { type: 'field', input: 'email', name: 'email', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } }, validations: [{ name: 'required' }] },
        { type: 'field', input: 'text', name: 'password', ui: { inputs: { label: 'Password', type: 'password', placeholder: 'Password', passwordStrength: null } }, validations: [{ name: 'required' }] },
    ],
    formStyle: 'linear',
    successHandler: {
        onSuccess: (auth, router) => {
            return router.navigateByUrl('/')
        }
    },
    links: (languageService: LanguageService, route: ActivatedRoute) => {
        return [{ label: 'create-account-label', text: 'create-account-text', url: `/${languageService.language}/account/signup` } as PageNavigationLink]
    }
}

const departmentField = selectField('department', 'department', new DataAdapter(
    new ClientDataSource([{ display: 'asdasd', value: 'asdasdasd' }]), 'value', 'display'), 'department placeholder', undefined, 'outline')


const signupOptions = {
    formDesign: { questionColor: '#fff', answerColor: '#eee' } as FormDesign,
    formFields: [
        { type: 'field', input: 'email', name: 'email', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } }, validations: [{ name: 'required' }] },
        { type: 'field', input: 'text', name: 'password', ui: { inputs: { label: 'Password', type: 'password', placeholder: 'Password', passwordStrength: null } }, validations: [{ name: 'required' }] },
        { type: 'field', input: 'select', name: 'department', ui: { inputs: { label: 'department', placeholder: 'select department' } }, validations: [{ name: 'required' }] },
        departmentField

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

const membershipOptions = {
    login: loginOptions,
    signup: signupOptions,
};


const usersOptions = {
    createUserFields: {
        _id: hiddenField('_id'),
        name: textField('name', 'Full name', 'Full name', undefined, 'outline', [{ name: 'required' }]),
        email: {
            type: 'field',
            name: 'email',
            input: 'email', ui: {
                inputs: {
                    label: 'Email',
                    required: true,
                    placeholder: 'Email',
                    appearance: 'outline'
                }
            }
        },
        isCorporate: switchField('isCorporate', 'Is corporate'),
        'claims/corpId': {
            type: 'field',
            name: 'claims/corpId',
            input: 'select', ui: {
                inputs: {
                    label: 'CorporationId',
                    required: true,
                    placeholder: 'corporation Id',
                    appearance: 'outline',
                    _adapter: {
                        path: '/user?isCorporate=true',
                        selectedColumns: ['_id', 'name'],
                        dataSource: 'server',
                        keyProperty: '_id',
                        valueProperty: undefined,
                        displayProperty: 'name',
                        options: {
                            terms: [{ field: 'name', type: 'like' }]
                        }
                    }
                }
            }
        }
    }
};

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        MembershipModule.forRoot(membershipOptions),
        // UsersModule.forRoot(usersOptions as unknown as any),
         DataTableModule, DynamicFormModule.forRoot(), AcountsRouterModule, MaterialModulesModule
    ],
    providers: [
       
      ],
    declarations: [UserFormComponent, UserListComponent,RoleListComponent,RoleFormComponent],
    exports: []
})
export class AccountsModule { }
