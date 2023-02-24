import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Camp, ContentItems } from '../../../../app/model';
import { AppService } from '../../../../app/providers/app.service';

@Component({
    selector: 'app-page-content-items-form',
    templateUrl: './page-content-items-form.component.html',
    styleUrls: ['./page-content-items-form.component.scss']
})
export class PageContentItemsFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);

    camps: Camp[]


    model: ContentItems

    section: string



    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private ls: LanguageService,
        public auth: AuthService,
        public appService: AppService) {
    }

    async ngOnInit() {
        this.camps = this.appService.camps

        const contentitemsId = this.route.snapshot.paramMap.get('id')
        this.section = this.route.snapshot.paramMap.get('section')
        if (contentitemsId) {
            this.model = await firstValueFrom(this.ds.get<ContentItems>(`contentitems/${contentitemsId}`))
        } else {
            this.model = { _id: undefined, campId: undefined, items: [], section: this.section }
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`contentitems/${this.model._id}`, this.model)
        }
        else {
            const res = await this.ds.post('contentitems', this.model)
        }
        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/contentitems/contentitems-list/' + this.section)
    }

    goBack() {
        window.history.back()
    }

    addPdf() {
        this.model.items.push({ type: 'pdf', url: '' })
    }
    addVideo() {
        this.model.items.push({ type: 'video', url: '' })
    }
    addHtml() {
        this.model.items.push({ type: 'html', content: '' })
    }

    deleteItem(index) {
        this.model.items.splice(index, 1)
    }
}
