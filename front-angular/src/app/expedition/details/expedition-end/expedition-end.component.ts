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
    let id = null;
    let data = null;
    let hora_inicio = null;
    let user_id = null;
    let ship_id = null;
    let local_id = null;
    let trashIds = null;

    this.expeditionForm = new FormGroup({
      id: new FormControl(id),
      data: new FormControl(data),
      hora_inicio: new FormControl(hora_inicio),
      user_id: new FormControl(user_id),
      ship_id: new FormControl(ship_id),
      local_id: new FormControl(local_id),
      trashIds: new FormControl(trashIds),
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
        user_id: expedition.user_id,
        ship_id: expedition.ship_id,
        local_id: expedition.local_id,
        trashIds: expedition.trashIds,  // Ou trash_ids, dependendo do nome correto na resposta
      });

      // Adicionando trash_ids aos selectedTrashs
      if (expedition.trashIds) {  // Ou trash_ids, dependendo do nome correto na resposta
        this.selectedTrashs = [...expedition.trashIds];  // Ou trash_ids, dependendo do nome correto na resposta
      }
    });
  }

  // Enviando a expedição
  onSubmit() {
    // Construindo o objeto da expedição
    const expeditionData = {
      ...this.expeditionForm.value,
      trashIds: this.selectedTrashs  // Adicionando os IDs dos lixos selecionados diretamente
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

      // Certifique-se de que os resíduos selecionados estão sendo destacados após o carregamento dos lixos
      if (this.isEditMode && this.expeditionForm.value.trash_ids) {
        this.selectedTrashs = [...this.expeditionForm.value.trash_ids];
      }
    });
  }
}
