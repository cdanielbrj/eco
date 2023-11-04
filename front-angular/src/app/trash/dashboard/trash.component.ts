import {Component, TemplateRef} from '@angular/core';
import {TrashList} from "../services/trash-list"
import {TrashService} from "../services/trash.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent {
  trashs: TrashList[] = [];
  trashForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private TrashService: TrashService,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) {}

  // --------------------------------- GET ---------------------------------
  // Listagem dos tipos automático
  ngOnInit(): void {
    this.fetchTrashs();
    console.log('Perfis carregados com sucesso');
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadTrashDetails(params['id']);
      }
    });
  }

  // Função de Listar
  fetchTrashs(): void {
    this.TrashService.getTrashLists().subscribe(
      (trashs) => {
        this.trashs = trashs;
      },
      (error) => {
        console.error('Error fetching trashs', error);
      }
    );
  }

  // Cadastrando um novo tipo de lixo
  openInfoModal(trash: TrashList | null, infoModal: TemplateRef<any>): void {
    this.trashForm.reset();
    if (trash) {
      this.isEditMode = true;
      this.trashForm.setValue({
        id: trash.id,
        nome: trash.nome,
      });
    } else {
      this.isEditMode = false;
    }
    this.modalRef = this.modalService.show(infoModal);
  }

  initForm() {
    this.trashForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
    });
  }

  // Editando o tipo de lixo
  loadTrashDetails(id: string) {
    this.TrashService.getTrashDetails(id).subscribe((trash) => {
      this.isEditMode = true;
      this.trashForm.setValue({
        id: trash.id,
        nome: trash.nome,
      });
    });
  }

  // Enviando os dados do tipo de lixo
  onSubmit() {
    if (this.trashForm.value.id) {
      this.TrashService.updateTrash(this.trashForm.value).subscribe(() => {
        console.log('Perfil atualizado com sucesso!');
        this.modalRef?.hide();
        this.fetchTrashs();
      });
    } else {
      this.TrashService.postTrashLists(this.trashForm.value).subscribe(() => {
        console.log('Perfil criado com sucesso!');
        this.modalRef?.hide();
        this.fetchTrashs();
      });
    }
  }

  // --------------------------------- DELETE ---------------------------------
  // Função de Excluir
  removeObj(id: String): void {
    this.TrashService.deleteTrashLists(id).subscribe(() => {
      console.log('Lixo excluído com sucesso!');
      this.fetchTrashs();
    });
  }

  // Modal
  public modalRef: BsModalRef | null = null;
  selectedTrash: { id: String, nome: String } | null = null;

  // Abrir o Modal
  openDeleteModal(template: TemplateRef<any>, trash: TrashList): void {
    this.selectedTrash = { id: trash.id, nome: trash.nome };
    this.modalRef = this.modalService.show(template);
  }

  // Confirmar a exclusão e chamar a função de excluir
  confirmDelete(): void {
    if (this.selectedTrash) {
      this.removeObj(this.selectedTrash.id);
      this.selectedTrash = null;
      this.modalRef?.hide();
    }
  }
}
