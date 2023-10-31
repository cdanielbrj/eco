import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import {ExpeditionDetails, ExpeditionList} from './expedition-list';
import { UserService } from "../users/services/user.service";
import {LocalService} from "../local/services/local.service";
import {ShipService} from "../ship/services/ship.service";

@Injectable({
  providedIn: 'root',
})

export class ExpeditionsService {
  private baseURL = 'http://localhost:8080/eco_system/expedition-oprs';
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private localService: LocalService,
    private shipService: ShipService
  ) {}

  /* Listando todas as expedições */
  getExpeditionLists(): Observable<ExpeditionDetails[]> {
    return this.httpClient.get<ExpeditionList[]>(this.baseURL).pipe(
      switchMap((expeditions) => {
        console.log('expeditions:', expeditions);

        const expeditionsWithDetails$ = expeditions.map((expedition) =>
          forkJoin({
            user: this.userService.getUserDetails(expedition.user_id),
            local: this.localService.getLocalDetails(expedition.local_id),
            ship: this.shipService.getShipDetails(expedition.ship_id)
          }).pipe(
            map(({ user, local, ship }) => ({
              ...expedition,
              userNome: user.nome,
              localNome: local.nome,
              shipNome: ship.nome
            }))
          )
        );
        return forkJoin(expeditionsWithDetails$);
      })
    );
  }

  /* Listando apenas uma expedição específica */
  getExpeditionDetails(id: String): Observable<ExpeditionList> {
    return this.httpClient.get<ExpeditionList>(`${this.baseURL}/${id}`);
  }

  /* Atualizando apenas uma expedição específica */
  updateExpedition(expedition: ExpeditionList): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseURL}/${expedition.id}`,
      expedition
    );
  }

  /* Criando Expedições */
  postExpeditionLists(form: any) {
    const formData: ExpeditionList = {
      data: form.data,
      hora_inicio: form.hora_inicio,
      user_id: form.user,
      ship_id: form.ship_id,
      local_id: form.local,
      id: '',
    };
    return this.httpClient
      .post('http://localhost:8080/eco_system/expedition-oprs', formData)
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

  /* Excluindo Expedições */
  deleteExpeditionLists(id: String): Observable<void> {
    return this.httpClient.delete<void>(
      'http://localhost:8080/eco_system/expedition-oprs/' + id
    );
  }
}
