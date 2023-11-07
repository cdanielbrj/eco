export interface ShipList {
  id: string;
  nome: string;
  motor: string;
  capacidade: number;
  ownerFisherId: string;
  partnerFisherId: string;
  ownerFisherNome?: string;
  partnerFisherNome?: string;
}

export interface ShipDetails extends ShipList {
  ownerFisherNome: string;
  partnerFisherNome: string;
}
