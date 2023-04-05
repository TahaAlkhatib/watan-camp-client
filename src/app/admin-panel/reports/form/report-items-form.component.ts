import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Camp, ReportBlock, ReportBody, ReportSector } from '../../../../app/model';
import { AppService } from '../../../../app/providers/app.service';

@Component({
    selector: 'app-report-items-form',
    templateUrl: './report-items-form.component.html',
    styleUrls: ['./report-items-form.component.scss']
})
export class ReportItemsFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);

    camps: Camp[]


    model: ReportBody

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

        const reportsitemsId = this.route.snapshot.paramMap.get('id')
        this.section = this.route.snapshot.paramMap.get('section')
        if (reportsitemsId) {
            this.model = await firstValueFrom(this.ds.get<ReportBody>(`tournament/${reportsitemsId}`))
            this.camps = this.appService.camps.filter(c => c._id == this.model.campId)
        } else {
            this.model = { _id: undefined, campId: undefined, sectors: [], section: this.section }
            let excludedCamps = this.appService.reports?.filter(it => it.section == this.section).map(it => it.campId) ?? []
            this.camps = this.appService.camps.filter(c => !excludedCamps.some(e => e == c._id))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`tournament/${this.model._id}`, this.model)
        }
        else {
            const res = await this.ds.post('tournament', this.model)
        }
        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/report/report-list/' + this.section)
    }

    goBack() {
        window.history.back()
    }

    addSector() {
        this.model.sectors.push({ arName: '', enName: '', blocks: [{ items: [{ arKey: '', arValue: '', enKey: '', enValue: '' }] }] })
    }
    addBlock(sector: ReportSector) {
        sector.blocks.push({ items: [{ arKey: '', arValue: '', enKey: '', enValue: '' }] })
    }
    addItem(block: ReportBlock) {
        block.items.push({ arKey: '', arValue: '', enKey: '', enValue: '' })
    }


    deleteSector(index) {
        this.model.sectors.splice(index, 1)
    }

    deleteBlock(sector: ReportSector, index) {
        sector.blocks.splice(index, 1)
    }
    deleteItem(block: ReportBlock, index) {
        block.items.splice(index, 1)
    }
}
