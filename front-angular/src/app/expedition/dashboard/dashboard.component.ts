import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExpeditionList} from '../services/expedition-list';
import {ExpeditionService} from '../services/expedition.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expeditions: ExpeditionList[] = [];
  todayExpeditions: ExpeditionList[] = [];
  pastExpeditions: ExpeditionList[] = [];
  selectedExpeditionsIndex: number[] = [];

  constructor(
    private expeditionsService: ExpeditionService,
    private modalService: BsModalService,
    private router: Router
  ) {
  }

  // --------------------------------- GET ---------------------------------
  // Listagem das expedições automática
  ngOnInit(): void {
    this.fetchExpeditions();
    console.log('Expedições carregadas com sucesso');
  }

  fetchExpeditions(): void {
    this.expeditionsService.getExpeditionGeneralInfo().subscribe(
      (expeditions) => {
        this.expeditions = expeditions;
        const now = new Date();
        const currentDay = now.getDate();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        // Filtragem separada para todayExpeditions e pastExpeditions
        this.todayExpeditions = this.expeditions.filter(expedition => {
          const [expDay, expMonth, expYear] = expedition.data.split('/').map(Number);
          const isToday = expDay === currentDay && expMonth === currentMonth && expYear === currentYear;

          // Checa se pesolixo é nulo ou vazio e converte para número
          const trashWeight = expedition.pesolixo
            ? parseFloat(expedition.pesolixo.replace(',', '.'))
            : 0;

          // A expedição deve ser hoje e não deve ter pesolixo
          return isToday && trashWeight === 0;
        });

        this.pastExpeditions = this.expeditions.filter(expedition => {
          const [expDay, expMonth, expYear] = expedition.data.split('/').map(Number);
          const isPastDate = (expYear < currentYear) ||
            (expYear === currentYear && expMonth < currentMonth) ||
            (expYear === currentYear && expMonth === currentMonth && expDay < currentDay);

          const trashWeight = expedition.pesolixo
            ? parseFloat(expedition.pesolixo.replace(',', '.'))
            : 0;
          const hasTrashWeight = trashWeight > 0;

          // A expedição é considerada passada se a data já ocorreu ou se o peso do lixo é maior que 0
          return isPastDate || hasTrashWeight;
        });
      },
      (error) => {
        console.error('Erro ao atualizar expedições', error);
      }
    );
  }

  showPastExpeditions: boolean = false;

  togglePastExpeditions(): void {
    this.showPastExpeditions = !this.showPastExpeditions;
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
      this.fetchExpeditions();
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

  finishExpedition(id: String): void {
    this.router.navigate(['/expedition/end/', id]);
  }

  // --------------------------------- EXPORT ---------------------------------
  selectAll: boolean = false;

  selectAllExpeditions(): void {
    this.selectedExpeditionsIndex = this.pastExpeditions.map((_, index) => index);
  }

  deselectAllExpeditions(): void {
    this.selectedExpeditionsIndex = [];
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectAllExpeditions();
    } else {
      this.deselectAllExpeditions();
    }
  }

  toggleSelection(index: number): void {
    const idx = this.selectedExpeditionsIndex.indexOf(index);
    if (idx === -1) {
      this.selectedExpeditionsIndex.push(index);
    } else {
      this.selectedExpeditionsIndex.splice(idx, 1);
    }
    this.selectAll = this.selectedExpeditionsIndex.length === this.pastExpeditions.length;
  }

  isExpeditionSelected(index: number): boolean {
    return this.selectAll || this.selectedExpeditionsIndex.includes(index);
  }

  convertToCSV(data: any[]): string {
    const csv = data.map(row => Object.values(row).join(';'));
    csv.unshift(Object.keys(data[0]).join(';'));
    return csv.join('\n');
  }

  downloadCSV(data: string, filename: string): void {
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportSelectedExpeditions(): void {
    // Recuperar expedições selecionadas com base nos índices armazenados
    const selectedExpeditions = this.selectedExpeditionsIndex.map(index => this.pastExpeditions[index]);
    // Verificar se há alguma expedição selecionada
    if (selectedExpeditions.length === 0) {
      console.log('Nenhuma expedição foi selecionada para exportação.');
      return;
    }
    // Converte as expedições selecionadas para formato CSV
    const csvData = this.convertToCSV(selectedExpeditions);
    // Inicia o download do CSV
    this.downloadCSV(csvData, 'expeditions.csv');
  }
}
