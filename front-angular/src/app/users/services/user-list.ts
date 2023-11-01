import {UserRole} from "./user-role.enum";

export interface UserList {
  id: string;
  login: string;
  password: string;
  role: UserRole;
  nome: string;
  contato?: string;
}

export interface UserDetails extends UserList {
  nome: string;
  contato: string;
}
