package com.eco.backspring.restapis.Expedition_API.DTO;

public record ExpeditionDTO(
        Long id,
        String data,
        String hora_inicio,
        Long local_id,
        Long ship_id
) { }
