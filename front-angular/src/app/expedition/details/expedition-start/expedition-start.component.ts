import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ExpeditionService} from "../../services/expedition.service";
import {LocalService} from "../../../local/services/local.service";
import {UserService} from "../../../users/services/user.service";
import {ShipService} from "../../../ship/services/ship.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-expedition-start',
  templateUrl: './expedition-start.component.html',
  styleUrls: ['./expedition-start.component.css']
})
export class ExpeditionStartComponent implements OnInit {
  expeditionForm!: FormGroup;
  isEditMode: boolean = false;
  locals: any[] = [];
  users: any[] = [];
  ships: any[] = [];

  constructor(
    private ExpeditionsService: ExpeditionService,
    private LocalService: LocalService,
    private UserService: UserService,
    private ShipService: ShipService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.carregarLocais();
    this.carregarUsuarios();
    this.carregarBarcos();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadExpeditionDetails(params['id']);
      }
    });
  }

  // Criando a expedição
  initForm() {
    let id = null;
    let data = null;
    let hora_inicio = null;
    let user_id = null;
    let ship_id = null;
    let local_id = null;

    this.expeditionForm = new FormGroup({
      id: new FormControl(id),
      data: new FormControl(data),
      hora_inicio: new FormControl(hora_inicio),
      user_id: new FormControl(user_id),
      ship_id: new FormControl(ship_id),
      local_id: new FormControl(local_id),
    });
  }

  // Editando uma expedição
  loadExpeditionDetails(id: string) {
    this.ExpeditionsService.getExpeditionDetails(id).subscribe((expedition) => {
      this.isEditMode = true;
      this.expeditionForm.setValue({
        id: expedition.id,
        data: expedition.data,
        hora_inicio: expedition.hora_inicio,
        user_id: expedition.user_id,
        ship_id: expedition.ship_id,
        local_id: expedition.local_id,
      });
    });
  }

  // Enviando a expedição
  onSubmit() {
    if (this.expeditionForm.value.id) {
      this.ExpeditionsService.updateExpedition(
        this.expeditionForm.value
      ).subscribe((response) => {
        console.log('Expedição atualizada com sucesso!');
        this.router.navigate(['/expedition/list']);
      });
    } else {
      this.ExpeditionsService.postExpeditionLists(this.expeditionForm.value);
      console.log('Expedição criada com sucesso!');
      this.router.navigate(['/expedition/list']);
    }
  }

  /* Integrações com outras APIs */
  carregarLocais() {
    this.LocalService.getLocalLists().subscribe((data) => {
      this.locals = data;
    });
  }

  carregarUsuarios() {
    this.UserService.getUserLists().subscribe((data) => {
      this.users = data.filter(user => user.role === 'USER');
    });
  }

  carregarBarcos() {
    this.ShipService.getShipLists().subscribe((data) => {
      this.ships = data;
    });
  }
}
