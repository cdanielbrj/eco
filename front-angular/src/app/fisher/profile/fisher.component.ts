import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FisherService } from '../services/fisher.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fisher',
  templateUrl: './fisher.component.html',
  styleUrls: ['./fisher.component.css']
})

export class FisherComponent implements OnInit {
  fisherForm!: FormGroup;
  isEditMode: boolean = false;
  constructor(
    private FisherService: FisherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadFisherDetails(params['id']);
      }
    });
  }

  // Criando o perfil do pescador
  initForm() {
    let id = null;
    let nome = null;
    let contato = null;
    let local_coleta = null;
    let barco = null;

    this.fisherForm = new FormGroup({
      id: new FormControl(id),
      nome: new FormControl(nome),
      contato: new FormControl(contato),
      local_coleta: new FormControl(local_coleta),
      barco: new FormControl(barco),
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
        local_coleta: fisher.local_coleta,
        barco: fisher.barco,
      });
    });
  }

  // Enviando os dados do pescador
  onSubmit() {
    if (this.fisherForm.value.id) {
      this.FisherService.updateFisher(
        this.fisherForm.value
      ).subscribe((response) => {
        console.log('Perfil atualizado com sucesso!');
        this.router.navigate(['/fisher/list']);
      });
    } else {
      this.FisherService.postFisherLists(this.fisherForm.value);
      console.log('Perfil criado com sucesso!');
      this.router.navigate(['/fisher/list']);
    }
  }
}
