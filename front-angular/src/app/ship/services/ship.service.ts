import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShipList} from "./ship-list";

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private baseURL = 'http://localhost:8080/eco_system/ship-oprs';
  constructor(private httpClient: HttpClient) {}

  /* Listando todos os barcos */
  getShipLists(): Observable<ShipList[]> {
    return this.httpClient.get<ShipList[]>(this.baseURL);
  }

  /* Listando apenas um barco específico */
  getShipDetails(id: String): Observable<ShipList> {
    return this.httpClient.get<ShipList>(`${this.baseURL}/${id}`);
  }
}
