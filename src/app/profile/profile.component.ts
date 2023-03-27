import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@upupa/auth";
import { LanguageService } from "@upupa/language";
import { AppService } from "../providers/app.service";

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
    isLoggedIn: boolean = false
    user: any = {
        avatar: null,
        name: 'default user',
        email: 'default@default.com',
        address: 'default address',
        phone: '+90 xxx xxx xx xx',
        role: "employee, ben, doner",
        dateOfBirth: 1990,
        camp: 'default camp',
        department: 'default',
    }
    constructor(private router: Router,
        private lang: LanguageService,
        private auth: AuthService,
        private appSrvs: AppService) {

    }


    async ngOnInit() {
        // const token = localStorage.getItem('token')
        // if(token) this.isLoggedIn = true 


        this.auth.user$.subscribe(u => {

            this.isLoggedIn = u ? true : false;
            const department = this.appSrvs.departments.find(d => d._id == this.appSrvs.user.department).name
            console.log(department)
            const camp = this.appSrvs.camps.find(c => c._id == this.appSrvs.currentCampId).name
            u.camp = camp
            u.department = department?? 'default department'
            u.address = this.appSrvs.user.address ?? "Not added yet!"
            u.role = this.appSrvs.user.role
            u.dateOfBirth = this.appSrvs.user.dateOfBirth ?? "Not added yet!"
            u.name = this.appSrvs.user.fName + " " + this.appSrvs.user.lName
            if (u) this.user = { ...this.user, ...u };

        })


    }
    navToSginIn() {
        this.router.navigateByUrl(`${this.lang.language}/sign-in`)
    }

}