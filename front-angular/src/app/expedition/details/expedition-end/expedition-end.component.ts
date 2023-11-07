import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ExpeditionService} from "../../services/expedition.service";
import {LocalService} from "../../../local/services/local.service";
import {UserService} from "../../../users/services/user.service";
import {ShipService} from "../../../ship/services/ship.service";
import {TrashService} from "../../../trash/services/trash.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-expedition-end',
  templateUrl: './expedition-end.component.html',
  styleUrls: ['./expedition-end.component.css']
})
export class ExpeditionEndComponent implements OnInit {
  expeditionForm!: FormGroup;
  isEditMode: boolean = false;
  locals: any[] = [];
  users: any[] = [];
  ships: any[] = [];
  trashs: any[] = [];
  selectedTrashs: any[] = [];

  constructor(
    private ExpeditionsService: ExpeditionService,
    private LocalService: LocalService,
    private UserService: UserService,
    private ShipService: ShipService,
    private TrashService: TrashService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.carregarLocais();
    this.carregarUsuarios();
    this.carregarBarcos();
    this.carregarLixos();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadExpeditionDetails(params['id']);
      }
    });
  }

  // Criando a expedição
  initForm() {
    this.expeditionForm = new FormGroup({
      id: new FormControl(null),
      data: new FormControl(null),
      hora_inicio: new FormControl(null),
      sacosenv: new FormControl(null),
      sacosusd: new FormControl(null),
      pesolixo: new FormControl(null),
      user_id: new FormControl(null),
      ship_id: new FormControl(null),
      local_id: new FormControl(null),
      trashIds: new FormControl(null),
    });
  }

  // Editando uma expedição
  loadExpeditionDetails(id: string) {
    this.ExpeditionsService.getExpeditionDetails(id).subscribe((expedition) => {
      console.log('Detalhes da Expedição:', expedition);
      this.isEditMode = true;
      this.expeditionForm.patchValue({
        id: expedition.id,
        data: expedition.data,
        hora_inicio: expedition.hora_inicio,
        sacosenv: expedition.sacosenv,
        sacosusd: expedition.sacosusd,
        pesolixo: expedition.pesolixo,
        user_id: expedition.user_id,
        ship_id: expedition.ship_id,
        local_id: expedition.local_id,
        trashIds: expedition.trashIds,
      });

      //trash_ids aos selectedTrashs
      if (expedition.trashIds) {
        this.selectedTrashs = [...expedition.trashIds];
      }
    });
  }

  // Enviando a expedição
  onSubmit() {
    const expeditionData = {
      ...this.expeditionForm.value,
      trashIds: this.selectedTrashs
    };
    console.log("Dados a serem enviados:", expeditionData);
    if (expeditionData.id) {
      this.ExpeditionsService.updateExpedition(expeditionData)
        .subscribe((response) => {
          console.log('Expedição atualizada com sucesso!');
          this.router.navigate(['/expedition/list']);
        });
    } else {
      this.ExpeditionsService.postExpeditionLists(expeditionData);
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

  toggleSelectedTrash(trashIds: any) {
    if (this.selectedTrashs.includes(trashIds)) {
      this.selectedTrashs = this.selectedTrashs.filter(id => id !== trashIds);
    } else {
      this.selectedTrashs.push(trashIds);
    }
    console.log("Lixos selecionados:", this.selectedTrashs);
  }

  isTrashSelected(trash_id: any): boolean {
    return this.selectedTrashs.includes(trash_id);
  }

  carregarLixos() {
    this.TrashService.getTrashLists().subscribe((data) => {
      console.log("Resíduos recuperados: ", data);
      this.trashs = data;
      if (this.isEditMode && this.expeditionForm.value.trash_ids) {
        this.selectedTrashs = [...this.expeditionForm.value.trash_ids];
      }
    });
  }
}
