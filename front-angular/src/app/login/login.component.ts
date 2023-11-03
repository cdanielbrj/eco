import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    login: '',
    password: ''
  };

  error!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /* onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
  } */

  public errorMessage: string = '';

  onLogin(){
    console.log('Tentativa de login iniciada')
    console.log(this.loginData)
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log('Resposta', response)
        const token = response.token;
        sessionStorage.setItem('auth_token', token);

        this.router.navigate(['/main']);
      },

      error => {
        console.error('Erro no login: ', error);
        if (error.status === 403) {
          this.errorMessage = 'Login ou senha incorretos.';
        } else {
          this.errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
        }
      }
    );
  }
}
