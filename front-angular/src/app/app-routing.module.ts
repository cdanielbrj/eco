import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExpeditionComponent } from './expedition/expedition.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'expedition', component: ExpeditionComponent, canActivate: [AuthGuard]},
  { path: 'expedition/edit/:id', component: ExpeditionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
