import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UserRole} from "../services/user-role.enum";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private UserService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadUserDetails(params['id']);
      }
    });
  }

  // Criando o perfil do usuario
  initForm() {
    let role = UserRole.USER;
    this.userForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      contato: new FormControl(null),
      login: new FormControl(null),
      password: new FormControl(null),
      role: new FormControl(role)
    });
  }

  // Editando o perfil do usuario
  loadUserDetails(id: string) {
    this.UserService.getUserDetails(id).subscribe((user) => {
      this.isEditMode = true;
      this.userForm.setValue({
        id: user.id,
        nome: user.nome,
        contato: user.contato,
        login: user.login,
        password: user.login,
        role: user.role
      });
    });
  }

  // Enviando o perfil do usuario
  onSubmit() {
    if (this.userForm.value.id) {
      this.UserService.updateUser(
        this.userForm.value
      ).subscribe((response) => {
        console.log('Perfil atualizado com sucesso!');
        this.router.navigate(['/user/list']);
      });
    } else {
      this.UserService.postUserLists(this.userForm.value);
      console.log('Perfil criado com sucesso!');
      console.log(this.userForm.value);
      this.router.navigate(['/user/list']);
    }
  }

  protected readonly UserRole = UserRole;
}
