import { Component, OnInit } from '@angular/core';
import { ExpeditionsService } from '../actions/expeditions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.css']
})
export class ExpeditionComponent implements OnInit {

  expeditionForm!: FormGroup;
  /* isFetching: boolean = false;
  error:any = null; */
  constructor(private ExpeditionsService: ExpeditionsService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
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
      local_coleta: new FormControl(local_coleta)
    });
  }

  onSubmit(){
    this.ExpeditionsService.postExpeditionLists(this.expeditionForm.value);
  }
}
