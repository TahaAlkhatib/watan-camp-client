import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, hiddenField, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Settings } from '../../../../model';
import { htmlField } from "@upupa/dynamic-form";

@Component({
    selector: 'app-settings-form',
    templateUrl: './settings-form.component.html',
    styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);

    model: Settings
    formFields = {
        '_id': hiddenField('_id'),
        'phone': { type: 'field', input: 'text', name: 'phone', ui: { inputs: { label: 'phone', placeholder: 'phone' } }, validations: [{ name: 'required' }] },
        'whatsapp': { type: 'field', input: 'text', name: 'whatsapp', ui: { inputs: { label: 'whatsapp', placeholder: 'whatsapp' } }, validations: [{ name: 'required' }] },
        'email': { type: 'field', input: 'text', name: 'email', ui: { inputs: { label: 'email', placeholder: 'email' } }, validations: [{ name: 'required' }] },
        // 'aboutUsContent': htmlField('aboutUsContent', 'About Us Content')
        'aboutUsContent': { type: 'field', input: 'html', name: 'aboutUsContent', ui: { inputs: { label: 'aboutUsContent', placeholder: 'aboutUsContent' } }},
    }
    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        public auth: AuthService) {
    }

    async ngOnInit() {
        const settingsId = this.route.snapshot.paramMap.get('id')
        if (settingsId) {
            this.model = await firstValueFrom(this.ds.get<Settings>(`settings/${settingsId}`))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`settings/${this.model._id}`, this.model)

        }
        else {
            const res = await this.ds.post('settings', this.model)
        }

        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/settings/settings/settings-list')
    }

    goBack() {
        window.history.back()
    }
}
