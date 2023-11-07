package com.eco.backspring.restapis.Expedition_API.DTO;

import com.eco.backspring.restapis.Expedition_API.entity.Expedition;
import com.eco.backspring.restapis.Local_API.entity.Local;
import com.eco.backspring.restapis.Ship_API.entity.Ship;
import com.eco.backspring.restapis.Trash_API.entity.Trash;
import com.eco.backspring.restapis.User_API.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class ExpeditionMapper {
    public static Expedition toEntity(
            ExpeditionDTO dto,
            Local local,
            Ship ship,
            User user,
            List<Trash> trashes){
        Expedition expedition = new Expedition();

        expedition.setId(dto.id());
        expedition.setData(dto.data());
        expedition.setHora_inicio(dto.hora_inicio());
        expedition.setSacosenv(dto.sacosenv());
        expedition.setSacosusd(dto.sacosusd());
        expedition.setPesolixo(dto.pesolixo());
        expedition.setLocal(local);
        expedition.setShip(ship);
        expedition.setUser(user);
        expedition.setTrashes(trashes);

        return expedition;
    }

    public static ExpeditionDTO toDTO(Expedition expedition){
        List<Long> trashIds = expedition.getTrashes().stream()
                .map(Trash::getId)
                .collect(Collectors.toList());
        return new ExpeditionDTO(
                expedition.getId(),
                expedition.getData(),
                expedition.getHora_inicio(),
                expedition.getSacosenv(),
                expedition.getSacosusd(),
                expedition.getPesolixo(),
                expedition.getLocal().getId(),
                expedition.getShip().getId(),
                expedition.getUser().getId(),
                trashIds
        );
    }
}
