import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgOptimizedImage } from "@angular/common";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ExpeditionComponent } from './expedition/expedition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './login/auth.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FisherComponent } from './fisher/profile/fisher.component';
import { FisherDashboardComponent } from './fisher/dashboard/fisher-dashboard.component';
import { NavbarComponent } from './global-components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ExpeditionComponent,
    FisherComponent,
    FisherDashboardComponent,
    NavbarComponent
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
