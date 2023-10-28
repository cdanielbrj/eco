package com.eco.backspring.restapis.Ship_API.DTO;

public record ShipDTO(
        Long id,
        String nome,
        String motor,
        Integer capacidade,
        Long ownerFisherId,
        String ownerFisherNome,
        Long partnerFisherId,
        String partnerFisherNome
) { }
