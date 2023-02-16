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
        textField('name', 'Name', 'Name', null, null, [{ name: 'required' }])
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
    private ls: LanguageService,
    public auth: AuthService) {
    this.form = this.formOptions.formFields;
  }

  async ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get('id')
    if (roleId) {
      const role = await firstValueFrom(this.ds.get<Role>(`role/${roleId}`))
      this.initialValueFactory = () => {
        return { name: role.name, _id: role._id }
      }

    }
  }
  async submit(model) {
    if (model._id) {
      const res = await this.ds.put(`role/${model._id}`, model)
      
    }
    else {
      const res = await this.ds.post('role', model)
    }
    this.snack.openSuccess()
    this.router.navigateByUrl('app/tabs/account/role/role-list')
  }
}
