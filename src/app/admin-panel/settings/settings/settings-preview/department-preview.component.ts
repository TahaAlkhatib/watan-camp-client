import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Department } from '../../../../model';

@Component({
  selector: 'app-department-preview',
  templateUrl: './department-preview.component.html',
  styleUrls: ['./department-preview.component.css']
})
export class DepartmentPreviewComponent implements OnInit {
  serverUrl = environment.server_base_url
  department: Department
  constructor(private ds: DataService,
      public snack: SnackBarService,
      private router: Router,
      private route: ActivatedRoute) {
  }
  async ngOnInit() {
      const departmentId = this.route.snapshot.paramMap.get('id')
      if (departmentId) {
          this.department = await firstValueFrom(this.ds.get<Department>(`department/${departmentId}`)) 
      }
  }

}
