import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { Complaint } from '../../../../app/model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-complaint-preview',
    templateUrl: './complaint-preview.component.html',
    styleUrls: ['./complaint-preview.component.css']
})
export class ComplaintPreviewComponent implements OnInit {
    serverUrl = environment.server_base_url
    complaint: Complaint
    constructor(private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    async ngOnInit() {
        const complaintId = this.route.snapshot.paramMap.get('id')
        if (complaintId) {
            this.complaint = await firstValueFrom(this.ds.get<Complaint>(`complaint/${complaintId}`))
        }
    }

}
