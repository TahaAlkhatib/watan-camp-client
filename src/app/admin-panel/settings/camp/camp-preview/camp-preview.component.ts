import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { Camp } from '../../../../../app/model';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-camp-preview',
    templateUrl: './camp-preview.component.html',
    styleUrls: ['./camp-preview.component.css']
})
export class CampPreviewComponent implements OnInit {
    serverUrl = environment.server_base_url
    camp: Camp
    constructor(private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    async ngOnInit() {
        const campId = this.route.snapshot.paramMap.get('id')
        if (campId) {
            this.camp = await firstValueFrom(this.ds.get<Camp>(`camp/${campId}`))
        }
    }

}
