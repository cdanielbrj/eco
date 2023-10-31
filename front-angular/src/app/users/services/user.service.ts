import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserList} from "./user-list"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:8080/eco_system/auth/user';
  constructor(private httpClient: HttpClient) {}

  /* Listando todos os perfis */
  getUserLists(): Observable<UserList[]> {
    return this.httpClient.get<UserList[]>(this.baseURL);
  }

  /* Listando apenas um perfil específico */
  getUserDetails(id: String): Observable<UserList> {
    return this.httpClient.get<UserList>(`${this.baseURL}/${id}`);
  }
}
