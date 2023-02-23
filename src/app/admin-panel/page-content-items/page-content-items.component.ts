import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app/providers/app.service';



@Component({
    selector: 'page-content-items',
    templateUrl: './page-content-items.component.html',
    styleUrls: ['./page-content-items.component.scss']
})
export class PageContentItemsComponent implements OnInit {

    category: string
    section: string

    constructor(private activatedRoute: ActivatedRoute, private appService: AppService) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.category = params['category']
            this.section = params['section']
        })
    }

}
