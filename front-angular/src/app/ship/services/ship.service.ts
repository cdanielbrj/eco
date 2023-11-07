import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable, of, switchMap, throwError} from "rxjs";
import {FisherService} from "../../fisher/services/fisher.service";
import {ShipDetails, ShipList} from "./ship-list";
import {FisherList} from "../../fisher/services/fisher-list";

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private baseURL = 'http://localhost:8080/eco_system/ship-oprs';

  constructor(
    private httpClient: HttpClient,
    private fisherService: FisherService
  ) {
  }

  /* Obter a lista de pescadores não associados a nenhum barco */
  getUnassociatedFishers(): Observable<FisherList[]> {
    return forkJoin({
      ships: this.getShipGeneralInfo(),
      fishers: this.fisherService.getFisherLists()
    }).pipe(
      map(({ships, fishers}) => {
        const associatedFisherIds = new Set<string>(
          ships.reduce((acc, ship) => {
            if (ship.ownerFisherId) acc.push(ship.ownerFisherId.toString());
            if (ship.partnerFisherId) acc.push(ship.partnerFisherId.toString());
            return acc;
          }, [] as string[])
        );
        return fishers.filter(fisher =>
          !associatedFisherIds.has(fisher.id.toString()) && // Não associado a barco
          (fisher.advertencias?.length ?? 0) < 3 // Menos de 3 advertências
        );
      })
    );
  }

  /* Listando todos os barcos com informações dos pescadores */
  getShipGeneralInfo(): Observable<ShipDetails[]> {
    return this.httpClient.get<ShipList[]>(this.baseURL).pipe(
      switchMap((ships) => {
        const shipsWithDetails$ = ships.map((ship) => {
          const owner$ = ship.ownerFisherId
            ? this.fisherService.getFisherDetails(ship.ownerFisherId)
            : of(null);
          const partner$ = ship.partnerFisherId
            ? this.fisherService.getFisherDetails(ship.partnerFisherId)
            : of(null);

          return forkJoin({owner: owner$, partner: partner$}).pipe(
            map(({owner, partner}) => ({
              ...ship,
              ownerFisherNome: owner ? owner.nome : '',
              partnerFisherNome: partner ? partner.nome : '',
            }) as ShipDetails)
          );
        });
        return forkJoin(shipsWithDetails$);
      })
    );
  }

  /* Listando todos os barcos */
  getShipLists(): Observable<ShipList[]> {
    return this.httpClient.get<ShipList[]>(this.baseURL);
  }

  /* Listando apenas um barco específico */
  getShipDetails(id: String): Observable<ShipList> {
    return this.httpClient.get<ShipList>(`${this.baseURL}/${id}`);
  }

  /* Atualizando apenas um tipo específico */
  updateShip(ship: ShipList): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseURL}/${ship.id}`,
      ship
    );
  }

  /* Cadastrando um novo tipo */
  postShipLists(form: any): Observable<any> {
    // Verificar se ambos os pescadores estão presentes
    if (!form.ownerFisherId || !form.partnerFisherId) {
      // Lançar um erro se algum dos pescadores estiver faltando
      return throwError(() => new Error('Tanto Dono quanto Parceiro devem ser selecionados'));
    }

    // Continuar com a criação da embarcação se ambos os pescadores estiverem presentes
    const formData: ShipList = {
      nome: form.nome,
      motor: form.motor,
      capacidade: form.capacidade,
      ownerFisherId: form.ownerFisherId,
      partnerFisherId: form.partnerFisherId,
      id: '',
    };
    return this.httpClient.post(this.baseURL, formData);
  }

  /* Excluindo tipo */
  deleteShipLists(id: String): Observable<void> {
    return this.httpClient.delete<void>(
      'http://localhost:8080/eco_system/ship-oprs/' + id
    );
  }
}
