import { Component, OnInit } from '@angular/core';
import { ExpeditionsService } from '../actions/expeditions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.css'],
})
export class ExpeditionComponent implements OnInit {
  expeditionForm!: FormGroup;
  /* isFetching: boolean = false;
  error:any = null; */
  constructor(
    private ExpeditionsService: ExpeditionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadExpeditionDetails(params['id']);
      }
    });
  }

  initForm() {
    let id = null;
    let data = null;
    let hora_inicio = null;
    let bolsista = null;
    let barco = null;
    let local_coleta = null;

    this.expeditionForm = new FormGroup({
      id: new FormControl(id),
      data: new FormControl(data),
      hora_inicio: new FormControl(hora_inicio),
      bolsista: new FormControl(bolsista),
      barco: new FormControl(barco),
      local_coleta: new FormControl(local_coleta),
    });
  }

  loadExpeditionDetails(id: string) {
    this.ExpeditionsService.getExpeditionDetails(id).subscribe((expedition) => {
      this.expeditionForm.setValue({
        id: expedition.id,
        data: expedition.data,
        hora_inicio: expedition.hora_inicio,
        bolsista: expedition.bolsista,
        barco: expedition.barco,
        local_coleta: expedition.local_coleta,
      });
    });
  }

  onSubmit() {
    if (this.expeditionForm.value.id) {
      this.ExpeditionsService.updateExpedition(
        this.expeditionForm.value
      ).subscribe((response) => {
        console.log('Expedição atualizada com sucesso!');
        this.router.navigate(['/dashboard']);        
      });
    } else {
      this.ExpeditionsService.postExpeditionLists(this.expeditionForm.value);
      console.log('Expedição criada com sucesso!');
      this.router.navigate(['/dashboard']);
    }
  }
}
