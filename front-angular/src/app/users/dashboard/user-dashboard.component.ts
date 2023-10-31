import { Component } from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {UserList} from "../services/user-list";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  users: UserList[] = [];
  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  // Função de Listar
  private getUsers() {
    this.userService.getUserLists().subscribe((data) => {
      this.users = data;
    });
  }
}
