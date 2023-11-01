import {Component, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
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
    ) {
    }

    // --------------------------------- GET ---------------------------------
    // Listagem dos perfis automática
    ngOnInit(): void {
        this.getUsers();
        console.log('Perfis carregados com sucesso');
        this.fetchUsers();
        console.log('Novos perfis carregados com sucesso');
    }

    // Função de Listar
    private getUsers() {
        this.userService.getUserLists().subscribe((data) => {
            this.users = data;
        });
    }

    fetchUsers(): void {
        this.userService.getUserLists().subscribe(
            (users) => {
                this.users = users;
            },
            (error) => {
                console.error('Error fetching users', error);
            }
        );
    }

    // --------------------------------- UPDATE ---------------------------------
    editUser(id: String) {
        this.router.navigate(['/user/edit/', id]);
    }


    // --------------------------------- DELETE ---------------------------------
    // Função de Excluir
    removeObj(id: String): void {
        this.userService.deleteUserLists(id).subscribe((data) => {
            console.log(data);
            this.getUsers();
        });
    }

    // Modal
    public modalRef: BsModalRef | null = null;
    selectedUser: { id: String, nome: String } | null = null;

    // Abrir o Modal
    openDeleteModal(template: TemplateRef<any>, user: UserList): void {
        this.selectedUser = {id: user.id, nome: user.nome};
        this.modalRef = this.modalService.show(template);
    }

    // Confirmar a exclusão e chamar a função de excluir
    confirmDelete(): void {
        if (this.selectedUser) {
            this.removeObj(this.selectedUser.id);
            this.selectedUser = null;
            this.modalRef?.hide();
        }
    }

}
