package com.eco.backspring.restapis.Expedition_API.controller;

import com.eco.backspring.restapis.Expedition_API.entity.Expedition;
import com.eco.backspring.restapis.Expedition_API.repository.ExpeditionRepository;
import com.eco.backspring.restapis.Expedition_API.DTO.ExpeditionDTO;
import com.eco.backspring.restapis.Expedition_API.DTO.ExpeditionMapper;
import com.eco.backspring.restapis.Local_API.entity.Local;
import com.eco.backspring.restapis.Local_API.repository.LocalRepository;
import com.eco.backspring.restapis.Ship_API.entity.Ship;
import com.eco.backspring.restapis.Ship_API.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/eco_system/expedition-oprs")
public class ExpeditionController {

    @Autowired
    private ExpeditionRepository expeditionRepository;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private ShipRepository shipRepository;

    @GetMapping
    public ResponseEntity<List<ExpeditionDTO>> listarTudo() {
        List<Expedition> expeditions = expeditionRepository.findAll();

        List<ExpeditionDTO> dtos = expeditions.stream()
                .map(ExpeditionMapper::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpeditionDTO> listarUm(@PathVariable Long id) {
        Expedition expedition = expeditionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expedition não encontrada"));

        return ResponseEntity.ok(ExpeditionMapper.toDTO(expedition));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpeditionDTO> atualizar(@PathVariable Long id, @RequestBody ExpeditionDTO expeditionDTO) {
        if (!expeditionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Local local = localRepository.findById(expeditionDTO.local_id())
                .orElseThrow(() -> new RuntimeException("Local não encontrado"));

        Ship ship = shipRepository.findById(expeditionDTO.ship_id())
                .orElseThrow(() -> new RuntimeException("Embarcação não encontrada"));

        Expedition atualizar = ExpeditionMapper.toEntity(expeditionDTO, local, ship);
        atualizar.setId(id);

        expeditionRepository.save(atualizar);

        return ResponseEntity.ok(ExpeditionMapper.toDTO(atualizar));
    }

    @PostMapping
    public ResponseEntity<ExpeditionDTO> criar(@RequestBody ExpeditionDTO expeditionDTO) {
        Local local = localRepository.findById(expeditionDTO.local_id())
                .orElseThrow(() -> new RuntimeException("Local não encontrado"));

        Ship ship = shipRepository.findById(expeditionDTO.ship_id())
                .orElseThrow(() -> new RuntimeException("Embarcação não encontrada"));

        Expedition expedition = ExpeditionMapper.toEntity(expeditionDTO, local, ship);
        expeditionRepository.save(expedition);

        return ResponseEntity.ok(ExpeditionMapper.toDTO(expedition));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!expeditionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        expeditionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
