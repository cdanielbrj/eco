import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ShipService} from "../services/ship.service";
import {FisherService} from "../../fisher/services/fisher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FisherList} from "../../fisher/services/fisher-list";

@Component({
  selector: 'app-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.css']
})
export class ShipDetailsComponent implements OnInit {
  shipForm!: FormGroup;
  fishers: FisherList[] = [];
  isEditMode: boolean = false;

  constructor(
    private ShipService: ShipService,
    private FisherService: FisherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.carregarPescadoresDisponiveis();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadShipDetails(params['id']);
      }
    });
  }

  // Criando o formulário da embarcação
  initForm() {
    this.shipForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      motor: new FormControl(null),
      capacidade: new FormControl(null),
      ownerFisherId: new FormControl(null),
      partnerFisherId: new FormControl(null)
    });
  }

  // Carregando detalhes de uma embarcação para edição
  loadShipDetails(id: string) {
    this.ShipService.getShipDetails(id).subscribe((ship) => {
      this.isEditMode = true;
      // Configure o formulário com todos os valores recebidos, incluindo os pescadores
      this.shipForm.setValue({
        id: ship.id,
        nome: ship.nome,
        motor: ship.motor,
        capacidade: ship.capacidade,
        ownerFisherId: ship.ownerFisherId, // Atribua os valores dos pescadores
        partnerFisherId: ship.partnerFisherId
      });
    });
  }

  // Enviando a expedição
  onSubmit() {
    if (this.isEditMode) {
      this.ShipService.updateShip(this.shipForm.value).subscribe(() => {
        console.log('Embarcação atualizada com sucesso!');
        this.router.navigate(['/ship/list']);
      });
    } else {
      this.ShipService.postShipLists(this.shipForm.value).subscribe(() => {
        console.log('Embarcação criada com sucesso!');
        this.router.navigate(['/ship/list']);
      });
    }
  }

  carregarPescadoresDisponiveis(): void {
    this.ShipService.getUnassociatedFishers().subscribe(
      (fishers) => {
        console.log('Pescadores recebidos:', fishers); // Adicione esta linha para depuração
        this.fishers = fishers;
      },
      (error) => {
        console.error('Erro ao carregar pescadores não associados', error);
      }
    );
  }
}
