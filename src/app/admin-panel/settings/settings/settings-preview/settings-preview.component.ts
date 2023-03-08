import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Settings } from '../../../../model';

@Component({
  selector: 'app-settings-preview',
  templateUrl: './settings-preview.component.html',
  styleUrls: ['./settings-preview.component.css']
})
export class SettingsPreviewComponent implements OnInit {
  serverUrl = environment.server_base_url
  settings: Settings
  constructor(private ds: DataService,
      public snack: SnackBarService,
      private router: Router,
      private route: ActivatedRoute) {
  }
  async ngOnInit() {
      const settingsId = this.route.snapshot.paramMap.get('id')
      if (settingsId) {
          this.settings = await firstValueFrom(this.ds.get<Settings>(`settings/${settingsId}`)) 
      }
  }

}
