import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@upupa/auth";
import { DataService, ObjectId } from "@upupa/data";
import { LanguageService } from "@upupa/language";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'register-admin',
    templateUrl: 'register-admin.component.html',
    styleUrls: ['register-admin.component.scss']
})
export class RegisterAdminComponent {

    err: string
    constructor(private router: Router, private auth: AuthService, private ds: DataService, private lang: LanguageService) {

    }
    


    async ngOnInit() {
        const usrs: any[] = await firstValueFrom(this.ds.get<any[]>('user', { username: 'admin' }))

        var user: any
        if (usrs.length) user = usrs[0]
        if (!user) {
            const username = `admin`
            const name = `admin`
            const email = 'admin@watan.foundation'
            const _id = ObjectId.generate()

            try {
                await this.auth.signup({ _id, username, name, email }, 'Admin!123')
                await this.auth.signin({ id: _id, email, password: 'Admin!123' })
                this.router.navigateByUrl(`${this.lang.language}/admin`)
            } catch (error) {
                this.err = 'error registering'
            }
        } else {
            this.err = 'already existed'
        }
    }

}