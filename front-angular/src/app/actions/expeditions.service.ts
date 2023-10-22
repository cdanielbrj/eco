import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpeditionList } from '../actions/expedition-list';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {

  private baseURL = "http://localhost:8080/eco_system/expedition-oprs";
  constructor(private httpClient: HttpClient) { }

  /* Listando Expedições */
  getExpeditionLists(): Observable<ExpeditionList[]>{
    return this.httpClient.get<ExpeditionList[]>(this.baseURL);
  }

  /* Criando Expedições */
  postExpeditionLists(form: any){
    const formData: ExpeditionList = {
      data: form.data,
      hora_inicio: form.hora_inicio,
      bolsista: form.bolsista,
      barco: form.barco,
      local_coleta: form.local_coleta,
      id: '',
    };
    return this.httpClient.post('http://localhost:8080/eco_system/expedition-oprs', formData).subscribe(
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

  /* Excluindo Expedições */
  deleteExpeditionLists(id: String): Observable<void> {
    return this.httpClient.delete<void>('http://localhost:8080/eco_system/expedition-oprs/' + id);
  }
}
