import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FisherList } from '../services/fisher-list';

@Injectable({
  providedIn: 'root'
})

export class FisherService {
  private baseURL = 'http://localhost:8080/eco_system/fisher-oprs';
  constructor(private httpClient: HttpClient) {}

  /* Listando todos os perfis */
  getFisherLists(): Observable<FisherList[]> {
    return this.httpClient.get<FisherList[]>(this.baseURL);
  }

  /* Listando apenas um perfil específico */
  getFisherDetails(id: String): Observable<FisherList> {
    return this.httpClient.get<FisherList>(`${this.baseURL}/${id}`);
  }

  /* Atualizando apenas um perfil específico */
  updateFisher(fisher: FisherList): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseURL}/${fisher.id}`,
      fisher
    );
  }

  /* Criando Perfil */
  postFisherLists(form: any): Observable<any> {
    const formData: FisherList = {
      nome: form.nome,
      contato: form.contato,
      id: '',
    };
    return this.httpClient.post('http://localhost:8080/eco_system/fisher-oprs', formData);
  }

  /* Excluindo Perfil */
  deleteFisherLists(id: String): Observable<void> {
    return this.httpClient.delete<void>(
      'http://localhost:8080/eco_system/fisher-oprs/' + id
    );
  }
}
