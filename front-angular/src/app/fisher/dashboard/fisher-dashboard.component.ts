import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FisherList } from '../services/fisher-list';
import { FisherService } from '../services/fisher.service';

@Component({
  selector: 'app-fisher-dashboard',
  templateUrl: './fisher-dashboard.component.html',
  styleUrls: ['./fisher-dashboard.component.css']
})
export class FisherDashboardComponent implements OnInit {
  fishers: FisherList[] = [];

  constructor(
    private fisherService: FisherService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  // --------------------------------- GET ---------------------------------
  // Listagem dos perfis automática
  ngOnInit(): void {
    this.getFishers();
    console.log('Perfis carregados com sucesso');
    this.fetchFishers();
    console.log('Novos perfis carregados com sucesso');
  }

  // Função de Listar
  private getFishers() {
    this.fisherService.getFisherLists().subscribe((data) => {
      this.fishers = data;
    });
  }

  // Atualizar listagem
  fetchFishers(): void {
    this.fisherService.getFisherLists().subscribe(
      (fishers) => {
        this.fishers = fishers;
      },
      (error) => {
        console.error('Error fetching fishers', error);
      }
    );
  }

  // --------------------------------- DELETE ---------------------------------
  // Função de Excluir
  removeObj(id: String): void {
    this.fisherService.deleteFisherLists(id).subscribe((data) => {
      console.log(data);
      this.getFishers();
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

  // --------------------------------- UPDATE ---------------------------------
  editFisher(id: String) {
    this.router.navigate(['/fisher/edit/', id]);
  }
}
