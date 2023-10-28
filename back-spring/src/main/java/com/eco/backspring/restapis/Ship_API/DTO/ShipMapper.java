package com.eco.backspring.restapis.Ship_API.DTO;

import com.eco.backspring.restapis.Ship_API.entity.Ship;
import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import org.springframework.stereotype.Component;

@Component
public class ShipMapper {

    public ShipDTO toDTO(Ship ship) {
        if (ship == null) {
            return null;
        }

        Long ownerFisherId = null;
        String ownerFisherNome = null;
        Long partnerFisherId = null;
        String partnerFisherNome = null;

        Fisher ownerFisher = ship.getOwnerFisher();
        if (ownerFisher != null) {
            ownerFisherId = ownerFisher.getId();
            ownerFisherNome = ownerFisher.getNome();
        }

        Fisher partnerFisher = ship.getPartnerFisher();
        if (partnerFisher != null) {
            partnerFisherId = partnerFisher.getId();
            partnerFisherNome = partnerFisher.getNome();
        }

        return new ShipDTO(
                ship.getId(),
                ship.getNome(),
                ship.getMotor(),
                ship.getCapacidade(),
                ownerFisherId,
                ownerFisherNome,
                partnerFisherId,
                partnerFisherNome
        );
    }

    public Ship toEntity(ShipDTO shipDTO, Ship existingShip) {
        if (shipDTO == null) {
            return null;
        }

        if (existingShip == null) {
            existingShip = new Ship();
        }

        existingShip.setNome(shipDTO.nome());
        existingShip.setMotor(shipDTO.motor());
        existingShip.setCapacidade(shipDTO.capacidade());

        return existingShip;
    }
}