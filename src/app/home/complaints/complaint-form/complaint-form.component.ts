import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@upupa/common";
import { DataService } from "@upupa/data";
import { TranslateService } from "@upupa/language";
import { Complaint } from "../../../../app/model";

@Component({
    selector: "complaint-form",
    templateUrl: "complaint-form.component.html",
    styleUrls: ["complaint-form.component.scss"],
})
export class ComplaintFormComponent {
    complaint: Complaint = {
        _id: "",
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        complaint: "",
        status: 'onHold'
    };
    constructor(private router: Router, private ds: DataService, private snackbar: SnackBarService, private ts: TranslateService) { }

    ngOnInit() {

    }


    navTo(url: string) { }
    back() {
        const lang = localStorage.getItem("language");
        this.router.navigate([`${lang}/home/complaints`]);
    }
    async onSubmit() {
        var valid = Object.keys(this.complaint).filter(k => k != '_id').every(k => this.complaint[k]?.length && this.complaint[k]?.length > 0)
        if (valid) {
            await this.ds.post("complaint", this.complaint);
            this.snackbar.openSuccess(this.ts.translate('complaintSuccess'))
            this.complaint = {
                _id: "",
                fullName: "",
                email: "",
                phone: "",
                subject: "",
                complaint: "",
                status: 'onHold'
            }
        } else {
            this.snackbar.openFailed(this.ts.translate('complaintFailed'))
        }
    }
}
