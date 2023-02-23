import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@upupa/auth";
import { DataService } from "@upupa/data";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { User } from '@upupa/auth'
import { Camp, ContentItems } from "../model";


@Injectable({ providedIn: 'root' })
export class AppService {


    employee: User

    contentItems: ContentItems[] = []

    camps: Camp[]

    items: ContentItems[] = []

    currentCampId: string

    constructor(private ds: DataService, private auth: AuthService, private http: HttpClient) {

    }

    async initEmployeeInfo() {
        if (!this.auth?.user) return
        this.employee = await firstValueFrom(this.ds.get<User>(`user/${this.auth.user.sub}`))
    }

    async addUserToRoles(roles: string[], user: User) {
        return firstValueFrom(this.http.post(`http://localhost:3333/app/add-user-to-roles`, { roles, user }))
    }

    async getCamps() {
        this.camps = await firstValueFrom(this.ds.get<Camp[]>(`camp`))
        return this.camps
    }

    async getItems() {
        this.items = await firstValueFrom(this.ds.get<ContentItems[]>(`contentitems`))
        return this.items
    }

    getCurrentCamp() {
        this.currentCampId = localStorage.getItem('campId')
        return this.currentCampId
    }

    setCurrentCamp(campId: string) {
        localStorage['campId'] = campId
    }

    title: BehaviorSubject<string> = new BehaviorSubject('dashboard')
    appModules: BehaviorSubject<any[]> = new BehaviorSubject<any>([])

}