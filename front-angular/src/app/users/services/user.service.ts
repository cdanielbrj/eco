import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserList} from "./user-list"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:8080/eco_system/auth';
  private userURL = `${this.baseURL}/user`
  private listURL = `${this.baseURL}/user/list`;

  constructor(private httpClient: HttpClient) {
  }

  /* Listando todos os perfis */
  getUserLists(): Observable<UserList[]> {
    return this.httpClient.get<UserList[]>(this.listURL);
  }

  /* Listando apenas um perfil específico */
  getUserDetails(id: String): Observable<UserList> {
    return this.httpClient.get<UserList>(`${this.userURL}/${id}`);
  }

  /* Atualizando apenas um perfil específico */
  updateUser(user: UserList): Observable<void> {
    return this.httpClient.put<void>(
      `${this.userURL}/${user.id}`,
      user
    );
  }

  /* Criando Perfil */
  postUserLists(form: any) {
    const formData: UserList = {
      nome: form.nome,
      contato: form.contato,
      login: form.login,
      password: form.password,
      role: form.role,
      id: '',
    };
    return this.httpClient
      .post('http://localhost:8080/eco_system/auth/register', formData)
      .subscribe(
        (Response) => {
          console.log(Response);
          return Response;
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  /* Excluindo Perfil */
  deleteUserLists(id: String): Observable<void> {
    return this.httpClient.delete<void>(
      'http://localhost:8080/eco_system/auth/user/' + id
    );
  }
}
