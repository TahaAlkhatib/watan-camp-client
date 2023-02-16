import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginComponent, SignUpComponent } from "@upupa/membership";
import { RoleFormComponent } from "./roles/role-form/role-form.component";
import { RoleListComponent } from "./roles/role-list/role-list.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserFormComponent } from "./user/user-update/user-form.component";


const routes: Route[] = [
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
    { path: 'user-list', component: UserListComponent },
    { path: 'add-user', component: UserFormComponent },
    { path: 'edit-user/:id', component: UserFormComponent },
    { path: 'role/role-list', component: RoleListComponent },
    { path: 'role/add-role', component: RoleFormComponent },
    { path: 'role/edit-role/:id', component: RoleFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AcountsRouterModule {

}