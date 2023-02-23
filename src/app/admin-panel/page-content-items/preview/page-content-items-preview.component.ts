import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { ContentItems } from '../../../../app/model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-page-content-items-preview',
    templateUrl: './page-content-items-preview.component.html',
    styleUrls: ['./page-content-items-preview.component.css']
})
export class PageContentItemsPreviewComponent implements OnInit {
    serverUrl = environment.server_base_url
    model: ContentItems
    section:string
    constructor(private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    async ngOnInit() {
        const itemId = this.route.snapshot.paramMap.get('id')
        this.section = this.route.snapshot.paramMap.get('section')

        if (itemId) {
            this.model = await firstValueFrom(this.ds.get<ContentItems>(`contentitems/${itemId}`))
        }
    }

}
