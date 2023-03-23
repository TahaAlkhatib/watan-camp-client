import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textAreaField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Notification } from '../../../app/model';

@Component({
    selector: 'app-notifications-form',
    templateUrl: './notifications-form.component.html',
    styleUrls: ['./notifications-form.component.css']
})
export class NotificationsFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);


    model: Notification

    formFields = {
        'subject': { type: 'field', input: 'text', name: 'name', ui: { inputs: { label: 'name', placeholder: 'name' } }, validations: [{ name: 'required' }] },
        'message': textAreaField('message', 'message', 'message', null, 'outline',3,5)
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
        this.model = { subject: '', message: '' }
    }
    async submit() {

        this.snack.openSuccess('notification sent !!')
    }

    goBack() {
        window.history.back()
    }
}
