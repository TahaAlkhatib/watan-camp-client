import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "@upupa/common";
import { DynamicDialogComponent } from "src/app/dialogs/dynamic-dialog/dynamic-dialog.component";
import { ContentItems } from "src/app/model";
import { environment } from "src/environments/environment";
import { AppService } from "../../../app/providers/app.service";

@Component({
    selector: 'view-content',
    templateUrl: 'view-content.component.html',
    styleUrls: ['view-content.component.scss']
})
export class ViewContentComponent {

    lang = localStorage.getItem('language')

    section: string

    data: ContentItems

    constructor(private router: Router, private route: ActivatedRoute, private appService: AppService, private dialog: DialogService) {

    }

    ngOnInit() {
        this.section = this.route.snapshot.paramMap.get('section')
        this.data = this.appService.items?.find(x => x.section == this.section && x.campId == this.appService.currentCampId)
    }

    openVideo(url) {
        this.dialog.open(DynamicDialogComponent, { autoFullScreen: false, data: { inputs: { type: 'video', context: url } }, panelClass: 'dynamic-dialog-youtube' })
    }
    openPdf(item) {
        let url = ''
        if (item.files?.length) url = environment.server_base_url + '/' + item.files[0].path
        else url = item.url
        this.dialog.open(DynamicDialogComponent, { data: { inputs: { type: 'pdf', context: url } } })
    }

    back() {
        window.history.back()
    }
}