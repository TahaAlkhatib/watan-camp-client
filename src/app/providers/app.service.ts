import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@upupa/auth";
import { DataService } from "@upupa/data";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { Camp, CampUser, ContentItems, Department, Role, Settings } from "../model";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class AppService {


    user: CampUser


    camps: Camp[]

    items: ContentItems[] = []

    currentCampId: string

    settings: Settings

    departments: Department[] = []

    roles: Role[] = []

    constructor(private ds: DataService, private auth: AuthService, private http: HttpClient) {

    }

    async initEmployeeInfo() {
        if (!this.auth?.user) return
        this.user = await firstValueFrom(this.ds.get<CampUser>(`user/${this.auth.user.sub}`))
    }

    async addUserToRoles(roles: string[], user: CampUser) {
        return firstValueFrom(this.http.post(`${environment.server_base_url}/app/add-user-to-roles`, { roles, user }))
    }

    async getCamps() {
        this.camps = await firstValueFrom(this.ds.get<Camp[]>(`camp`))
        return this.camps
    }

    async getRoles() {
        this.roles = await firstValueFrom(this.ds.get<Role[]>(`role`))
        return this.roles
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