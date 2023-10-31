import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserList} from "../../users/services/user-list";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private baseURL = 'http://localhost:8080/eco_system/local-oprs';
  constructor(private httpClient: HttpClient) {}

  /* Listando todos os locais */
  getLocalLists(): Observable<UserList[]> {
    return this.httpClient.get<UserList[]>(this.baseURL);
  }

  /* Listando apenas um local específico */
  getLocalDetails(id: String): Observable<UserList> {
    return this.httpClient.get<UserList>(`${this.baseURL}/${id}`);
  }
}
