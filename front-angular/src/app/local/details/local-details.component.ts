import {Component, TemplateRef} from '@angular/core';
import {LocalList} from "../services/local-list";
import {LocalService} from "../services/local.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.css']
})
export class LocalDetailsComponent {
  locals: LocalList[] = [];
  localForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private LocalService: LocalService,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) {}

  // --------------------------------- GET ---------------------------------
  // Listagem automática
  ngOnInit(): void {
    this.fetchLocals();
    console.log('Locais carregados com sucesso');
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadLocalDetails(params['id']);
      }
    });
  }

  // Listagem simples
  fetchLocals(): void {
    this.LocalService.getLocalLists().subscribe(
      (locals) => {
        this.locals = locals;
      },
      (error) => {
        console.error('Erro atualizando locais', error);
      }
    );
  }

  // Cadastro
  openInfoModal(local: LocalList | null, infoModal: TemplateRef<any>): void {
    this.localForm.reset();
    if (local) {
      this.isEditMode = true;
      this.localForm.setValue({
        id: local.id,
        nome: local.nome,
      });
    } else {
      this.isEditMode = false;
    }
    this.modalRef = this.modalService.show(infoModal);
  }

  initForm() {
    this.localForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
    });
  }

  // Edição
  loadLocalDetails(id: string) {
    this.LocalService.getLocalDetails(id).subscribe((local) => {
      this.isEditMode = true;
      this.localForm.setValue({
        id: local.id,
        nome: local.nome,
      });
    });
  }

  // Envio dos dados
  onSubmit() {
    if (this.localForm.value.id) {
      this.LocalService.updateLocal(this.localForm.value).subscribe(() => {
        console.log('Perfil atualizado com sucesso!');
        this.modalRef?.hide();
        this.fetchLocals();
      });
    } else {
      this.LocalService.postLocalLists(this.localForm.value).subscribe(() => {
        console.log('Perfil criado com sucesso!');
        this.modalRef?.hide();
        this.fetchLocals();
      });
    }
  }

  // --------------------------------- DELETE ---------------------------------
  // Função de Excluir
  removeObj(id: String): void {
    this.LocalService.deleteLocalLists(id).subscribe(() => {
      console.log('Lixo excluído com sucesso!');
      this.fetchLocals();
    });
  }

  // Modal
  public modalRef: BsModalRef | null = null;
  selectedLocal: { id: String, nome: String } | null = null;

  // Abrir o Modal
  openDeleteModal(template: TemplateRef<any>, local: LocalList): void {
    this.selectedLocal = { id: local.id, nome: local.nome };
    this.modalRef = this.modalService.show(template);
  }

  // Confirmar a exclusão e chamar a função de excluir
  confirmDelete(): void {
    if (this.selectedLocal) {
      this.removeObj(this.selectedLocal.id);
      this.selectedLocal = null;
      this.modalRef?.hide();
    }
  }
}
