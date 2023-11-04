import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalList} from "./local-list";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private baseURL = 'http://localhost:8080/eco_system/local-oprs';
  constructor(private httpClient: HttpClient) {}

  /* Listando todos os locais */
  getLocalLists(): Observable<LocalList[]> {
    return this.httpClient.get<LocalList[]>(this.baseURL);
  }

  /* Listando apenas um local específico */
  getLocalDetails(id: String): Observable<LocalList> {
    return this.httpClient.get<LocalList>(`${this.baseURL}/${id}`);
  }

  /* Atualizando apenas um tipo específico */
  updateLocal(local: LocalList): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseURL}/${local.id}`,
      local
    );
  }

  /* Cadastrando um novo tipo */
  postLocalLists(form: any): Observable<any> {
    const formData: LocalList = {
      nome: form.nome,
      id: '',
    };
    return this.httpClient.post('http://localhost:8080/eco_system/local-oprs', formData);
  }

  /* Excluindo tipo */
  deleteLocalLists(id: String): Observable<void> {
    return this.httpClient.delete<void>(
      'http://localhost:8080/eco_system/local-oprs/' + id
    );
  }
}
