import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './expedition/dashboard/dashboard.component';
import {AuthGuard} from './login/auth.guard';
import {FisherDashboardComponent} from './fisher/dashboard/fisher-dashboard.component';
import {UserDashboardComponent} from './users/dashboard/user-dashboard.component';
import {UsersComponent} from './users/profile/users.component';
import {TrashComponent} from './trash/dashboard/trash.component';
import {LocalDetailsComponent} from './local/details/local-details.component';
import {HomeComponent} from "./global/components/home/home.component";
import {ExpeditionStartComponent} from "./expedition/details/expedition-start/expedition-start.component";
import {ExpeditionEndComponent} from "./expedition/details/expedition-end/expedition-end.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: HomeComponent},
  {path: 'expedition/list', component: DashboardComponent},
  {path: 'expedition/edit/:id', component: ExpeditionEndComponent},
  {path: 'expedition/start', component: ExpeditionStartComponent},
  {path: 'expedition/end/:id', component: ExpeditionEndComponent},
  {path: 'user/list', component: UserDashboardComponent},
  {path: 'user/new', component: UsersComponent},
  {path: 'user/edit/:id', component: UsersComponent},
  {path: 'fisher/list', component: FisherDashboardComponent},
  {path: 'trash/list', component: TrashComponent},
  {path: 'local/list', component: LocalDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
