import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ReportBody } from "src/app/model";

@Component({
    selector: 'report-items-view',
    templateUrl: 'report-items-view.component.html',
    styleUrls: ['report-items-view.component.scss']
})
export class ReportsItemsViewComponent {
    @Input() body: ReportBody


    lang = 'en'

    ngOnInit() {
        this.lang = localStorage.getItem('language')
    }



}