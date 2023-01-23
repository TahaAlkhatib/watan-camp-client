import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'dynamic-dialog',
    templateUrl: 'dynamic-dialog.component.html',
    styleUrls: ['dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnInit {
    type: string
    context: string
    constructor() {

    }
    ngOnInit(): void {
    }
}