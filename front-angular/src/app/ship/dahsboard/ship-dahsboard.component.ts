import {Component, TemplateRef} from '@angular/core';

import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ShipList} from "../services/ship-list";
import {ShipService} from "../services/ship.service";

@Component({
  selector: 'app-dahsboard',
  templateUrl: './ship-dahsboard.component.html',
  styleUrls: ['./ship-dahsboard.component.css']
})
export class ShipDahsboardComponent {
  ships: ShipList[] = [];

  constructor(
    private shipService: ShipService,
    private modalService: BsModalService,
    private router: Router
  ) {
  }

  // --------------------------------- GET ---------------------------------
  // Listagem dos perfis automática
  ngOnInit(): void {
    this.getShips();
    console.log('Perfis carregados com sucesso');
    this.fetchShips();
    console.log('Novos perfis carregados com sucesso');
  }

  // Função de Listar
  private getShips() {
    this.shipService.getShipLists().subscribe((data) => {
      this.ships = data;
    });
  }

  fetchShips(): void {
    this.shipService.getShipLists().subscribe(
      (ships) => {
        this.ships = ships;
      },
      (error) => {
        console.error('Error fetching ships', error);
      }
    );
  }

  // --------------------------------- UPDATE ---------------------------------
  editShip(id: String) {
    this.router.navigate(['/ship/edit/', id]);
  }


  // --------------------------------- DELETE ---------------------------------
  // Função de Excluir
  removeObj(id: String): void {
    this.shipService.deleteShipLists(id).subscribe((data) => {
      console.log(data);
      this.getShips();
    });
  }

  // Modal
  public modalRef: BsModalRef | null = null;
  selectedShip: { id: String, nome: String } | null = null;

  // Abrir o Modal
  openDeleteModal(template: TemplateRef<any>, ship: ShipList): void {
    this.selectedShip = {id: ship.id, nome: ship.nome};
    this.modalRef = this.modalService.show(template);
  }

  // Confirmar a exclusão e chamar a função de excluir
  confirmDelete(): void {
    if (this.selectedShip) {
      this.removeObj(this.selectedShip.id);
      this.selectedShip = null;
      this.modalRef?.hide();
    }
  }
}
