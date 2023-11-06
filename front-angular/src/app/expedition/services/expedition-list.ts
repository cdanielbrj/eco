export interface ExpeditionList {
    id: string;
    data: string;
    hora_inicio: string;
    user_id: string;
    local_id: string;
    ship_id: string;
    trashIds: string[];
    userNome?: string;
    localNome?: string;
    shipNome?: string;
    trashNomes?: string[];
}

export interface ExpeditionDetails extends ExpeditionList {
  userNome: string;
  localNome: string;
  shipNome: string;
  trashNomes: string[];
}
