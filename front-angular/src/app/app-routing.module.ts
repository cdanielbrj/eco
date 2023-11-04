import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExpeditionComponent } from './expedition/expedition.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';
import { FisherDashboardComponent } from './fisher/dashboard/fisher-dashboard.component';
import { UserDashboardComponent } from './users/dashboard/user-dashboard.component';
import { UsersComponent } from './users/profile/users.component';
import { TrashComponent } from './trash/dashboard/trash.component';
import { LocalDetailsComponent } from './local/details/local-details.component';
import { HomeComponent } from "./global/components/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expedition', component: ExpeditionComponent },
  { path: 'expedition/edit/:id', component: ExpeditionComponent },
  { path: 'fisher/list', component: FisherDashboardComponent },
  { path: 'user/list', component: UserDashboardComponent },
  { path: 'user', component: UsersComponent },
  { path: 'user/edit/:id', component: UsersComponent },
  { path: 'main', component: HomeComponent },
  { path: 'trash/list', component: TrashComponent },
  { path: 'local/list', component: LocalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
