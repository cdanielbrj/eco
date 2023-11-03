import { Component, OnInit, TemplateRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FisherList } from '../services/fisher-list';
import { FisherService } from '../services/fisher.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fisher-dashboard',
  templateUrl: './fisher-dashboard.component.html',
  styleUrls: ['./fisher-dashboard.component.css']
})
export class FisherDashboardComponent implements OnInit {
  fishers: FisherList[] = [];
  fisherForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private FisherService: FisherService,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) {}

  // --------------------------------- GET ---------------------------------
  // Listagem dos perfis automática
  ngOnInit(): void {
    this.fetchFishers();
    console.log('Perfis carregados com sucesso');
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadFisherDetails(params['id']);
      }
    });
  }

  // Função de Listar
  fetchFishers(): void {
    this.FisherService.getFisherLists().subscribe(
      (fishers) => {
        this.fishers = fishers;
      },
      (error) => {
        console.error('Error fetching fishers', error);
      }
    );
  }

  // Criando o perfil do pescador
  openInfoModal(fisher: FisherList | null, infoModal: TemplateRef<any>): void {
    this.fisherForm.reset();
    if (fisher) {
      this.isEditMode = true;
      this.fisherForm.setValue({
        id: fisher.id,
        nome: fisher.nome,
        contato: fisher.contato,
      });
    } else {
      this.isEditMode = false;
    }
    this.modalRef = this.modalService.show(infoModal);
  }

  initForm() {
    this.fisherForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      contato: new FormControl(null),
    });
  }

  // Editando o perfil do pescador
  loadFisherDetails(id: string) {
    this.FisherService.getFisherDetails(id).subscribe((fisher) => {
      this.isEditMode = true;
      this.fisherForm.setValue({
        id: fisher.id,
        nome: fisher.nome,
        contato: fisher.contato,
      });
    });
  }

  // Enviando os dados do pescador
  onSubmit() {
    if (this.fisherForm.value.id) {
      this.FisherService.updateFisher(this.fisherForm.value).subscribe(() => {
        console.log('Perfil atualizado com sucesso!');
        this.modalRef?.hide();
        this.fetchFishers();
      });
    } else {
      this.FisherService.postFisherLists(this.fisherForm.value).subscribe(() => {
        console.log('Perfil criado com sucesso!');
        this.modalRef?.hide();
        this.fetchFishers();
      });
    }
  }

  // --------------------------------- DELETE ---------------------------------
  // Função de Excluir
  removeObj(id: String): void {
    this.FisherService.deleteFisherLists(id).subscribe(() => {
      console.log('Perfil excluído com sucesso!');
      this.fetchFishers();
    });
  }

  // Modal
  public modalRef: BsModalRef | null = null;
  selectedFisher: { id: String, nome: String } | null = null;

  // Abrir o Modal
  openDeleteModal(template: TemplateRef<any>, fisher: FisherList): void {
    this.selectedFisher = { id: fisher.id, nome: fisher.nome };
    this.modalRef = this.modalService.show(template);
  }

  // Confirmar a exclusão e chamar a função de excluir
  confirmDelete(): void {
    if (this.selectedFisher) {
      this.removeObj(this.selectedFisher.id);
      this.selectedFisher = null;
      this.modalRef?.hide();
    }
  }
}
