import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgOptimizedImage } from "@angular/common";
import { DashboardComponent } from './expedition/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './login/auth.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FisherDashboardComponent } from './fisher/dashboard/fisher-dashboard.component';
import { NavbarComponent } from './global/components/navbar/navbar.component';
import { UsersComponent } from './users/profile/users.component';
import { UserDashboardComponent } from './users/dashboard/user-dashboard.component';
import { LocalDetailsComponent } from './local/details/local-details.component';
import { ShipDetailsComponent } from './ship/details/ship-details.component';
import { ShipDahsboardComponent } from './ship/dahsboard/ship-dahsboard.component';
import { HomeComponent } from './global/components/home/home.component';
import { TrashComponent } from './trash/dashboard/trash.component';
import { FormatDataDirective } from './global/directives/data/format-data.directive';
import { FormatHoraDirective } from './global/directives/hora/format-hora.directive';
import { FormatContatoDirective } from './global/directives/contato/format-contato.directive';
import { BeautyContatoPipe } from './global/pipes/contato/beauty-contato.pipe';
import { ExpeditionEndComponent } from './expedition/details/expedition-end/expedition-end.component';
import { ExpeditionStartComponent } from './expedition/details/expedition-start/expedition-start.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FisherDashboardComponent,
    NavbarComponent,
    UsersComponent,
    UserDashboardComponent,
    LocalDetailsComponent,
    ShipDetailsComponent,
    ShipDahsboardComponent,
    HomeComponent,
    TrashComponent,
    FormatDataDirective,
    FormatHoraDirective,
    FormatContatoDirective,
    BeautyContatoPipe,
    ExpeditionEndComponent,
    ExpeditionStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
