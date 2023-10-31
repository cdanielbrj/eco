package com.eco.backspring.restapis.Expedition_API.DTO;

import java.util.List;

public record ExpeditionDTO(
        Long id,
        String data,
        String hora_inicio,
        Long local_id,
        Long ship_id,
        String user_id,
        List<Long> trashIds
) {
    public ExpeditionDTO {
        trashIds = (trashIds == null) ? List.of() : trashIds;
    }
}
