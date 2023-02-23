import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'complaint-form',
    templateUrl: 'complaint-form.component.html',
    styleUrls: ['complaint-form.component.scss']
})
export class ComplaintFormComponent {
    complaint: {
        fullName: string
        email: string
        phone: string
        subject: string
        complaint: string
    } = {
            fullName: '',
            email: '',
            phone: '',
            subject: '',
            complaint: ''
        }
    constructor(private router: Router) {

    }
    navTo(url: string) {

    }
    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/complaints`])
    }
    onSubmit(){}
}