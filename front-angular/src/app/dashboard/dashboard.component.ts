import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExpeditionList } from '../actions/expedition-list';
import { ExpeditionsService } from '../actions/expeditions.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expeditions: ExpeditionList[] = [];

  constructor(
    private expeditionsService: ExpeditionsService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  // --------------------------------- GET ---------------------------------
  // Listagem das expedições automática
  ngOnInit(): void {
    this.getExpeditions();
    console.log('Expedições carregadas com sucesso');
    this.fetchExpeditions();
    console.log('Novas expedições carregadas com sucesso');
  }

  fetchExpeditions(): void {
    this.expeditionsService.getExpeditionLists().subscribe(
      (expeditions) => {
        this.expeditions = expeditions;
      },
      (error) => {
        console.error('Error fetching expeditions', error);
      }
    );
  }

  // Função de Listar
  private getExpeditions() {
    this.expeditionsService.getExpeditionLists().subscribe((data) => {
      this.expeditions = data;
    });
  }

  // Modal
  public modalRef: BsModalRef | null = null;
  selectedExpeditionId: String | null = null;

  // Abrir o Modal
  openDeleteModal(template: TemplateRef<any>, id: string): void {
    this.selectedExpeditionId = id;
    this.modalRef = this.modalService.show(template);
  }

  // --------------------------------- DELETE ---------------------------------
  // Função de Excluir
  removeExp(id: String): void {
    this.expeditionsService.deleteExpeditionLists(id).subscribe((data) => {
      console.log(data);
      this.getExpeditions();
    });
  }

  // Confirmar a exclusão e chamar a função de excluir
  confirmDelete(): void {
    if (this.selectedExpeditionId) {
      this.removeExp(this.selectedExpeditionId);
      this.selectedExpeditionId = null;
      this.modalRef?.hide();
    }
  }

  // --------------------------------- UPDATE ---------------------------------
  editExpedition(id: String) {
    this.router.navigate(['/expedition/edit/', id]);
  }
}
