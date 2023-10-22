import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExpeditionList } from '../actions/expedition-list';
import { ExpeditionsService } from '../actions/expeditions.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  expeditions: ExpeditionList[] = [];
  
  constructor(
    private expeditionsService: ExpeditionsService,
    private modalService: BsModalService
    ) {}

  ngOnInit(): void {
    this.getExpeditions();
  }

  private getExpeditions(){
    this.expeditionsService.getExpeditionLists().subscribe(data => {
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

  // Função de Excluir
  removeExp(id: String): void {
    this.expeditionsService.deleteExpeditionLists(id).subscribe( data => {
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
}
