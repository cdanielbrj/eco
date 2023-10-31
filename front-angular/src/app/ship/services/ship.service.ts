import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserList} from "../../users/services/user-list";

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private baseURL = 'http://localhost:8080/eco_system/ship-oprs';
  constructor(private httpClient: HttpClient) {}

  /* Listando todos os barcos */
  getShipLists(): Observable<UserList[]> {
    return this.httpClient.get<UserList[]>(this.baseURL);
  }

  /* Listando apenas um barco específico */
  getShipDetails(id: String): Observable<UserList> {
    return this.httpClient.get<UserList>(`${this.baseURL}/${id}`);
  }
}
