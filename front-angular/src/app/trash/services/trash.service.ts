import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrashList} from "./trash-list";

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  private baseURL = 'http://localhost:8080/eco_system/trash-oprs';

  constructor(private httpClient: HttpClient) {
  }

  /* Listando todos os tipos */
  getTrashLists(): Observable<TrashList[]> {
    return this.httpClient.get<TrashList[]>(this.baseURL);
  }

  /* Listando apenas um tipo específico */
  getTrashDetails(id: String): Observable<TrashList> {
    return this.httpClient.get<TrashList>(`${this.baseURL}/${id}`);
  }

  /* Atualizando apenas um tipo específico */
  updateTrash(trash: TrashList): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseURL}/${trash.id}`,
      trash
    );
  }

  /* Cadastrando um novo tipo */
  postTrashLists(form: any): Observable<any> {
    const formData: TrashList = {
      nome: form.nome,
      id: '',
    };
    return this.httpClient.post('http://localhost:8080/eco_system/trash-oprs', formData);
  }

  /* Excluindo tipo */
  deleteTrashLists(id: String): Observable<void> {
    return this.httpClient.delete<void>(
      'http://localhost:8080/eco_system/trash-oprs/' + id
    );
  }
}
