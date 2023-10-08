import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient, 
    private router: Router
  ) { }

  login(credentials: {login: string, password: string }): Observable<any>{
    return this.httpClient.post('http://localhost:8080/eco_system/auth/login', credentials);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('auth_token');
    return !!token;
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
