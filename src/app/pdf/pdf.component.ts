import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'pdf',
    templateUrl:'pdf.component.html',
    styleUrls: []
})
export class PdfComponent implements OnInit {
    constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.Src = params['pdf']
        })
    }
    Src: string

}