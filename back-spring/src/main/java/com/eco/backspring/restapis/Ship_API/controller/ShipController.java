package com.eco.backspring.restapis.Ship_API.controller;

import com.eco.backspring.restapis.Expedition_API.entity.Expedition;
import com.eco.backspring.restapis.Expedition_API.repository.ExpeditionRepository;
import com.eco.backspring.restapis.Fisher_API.entity.Fisher;
import com.eco.backspring.restapis.Fisher_API.repository.FisherRepository;
import com.eco.backspring.restapis.Ship_API.DTO.ShipDTO;
import com.eco.backspring.restapis.Ship_API.DTO.ShipMapper;
import com.eco.backspring.restapis.Ship_API.entity.Ship;
import com.eco.backspring.restapis.Ship_API.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/eco_system/ship-oprs")
public class ShipController {

    private final ShipRepository shipRepository;
    private final ShipMapper shipMapper;
    private final FisherRepository fisherRepository;
    private final ExpeditionRepository expeditionRepository;

    @Autowired
    public ShipController(
            ShipRepository shipRepository,
            ShipMapper shipMapper,
            FisherRepository fisherRepository,
            ExpeditionRepository expeditionRepository ){
        this.shipRepository = shipRepository;
        this.shipMapper = shipMapper;
        this.fisherRepository = fisherRepository;
        this.expeditionRepository = expeditionRepository;
    }

    @GetMapping
    public List<ShipDTO> getAllShips() {
        List<Ship> ships = shipRepository.findAll();
        return ships.stream().map(shipMapper::toDTO).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShipDTO> getShipById(@PathVariable Long id) {
        Optional<Ship> shipOptional = shipRepository.findById(id);
        return shipOptional.map(ship -> ResponseEntity.ok(shipMapper.toDTO(ship))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    private boolean isFisherAssignedAsOwner(Long fisherId) {
        return shipRepository.findByOwnerFisherId(fisherId).isPresent();
    }

    private boolean isFisherAssignedAsPartner(Long fisherId) {
        return shipRepository.findByPartnerFisherId(fisherId).isPresent();
    }

    private boolean isFisherEligible(Long fisherId) {
        Optional<Fisher> fisherOptional = fisherRepository.findById(fisherId);
        if (fisherOptional.isPresent()) {
            Fisher fisher = fisherOptional.get();
            // Verificar se o pescador tem 3 ou mais advertências
            return fisher.getAdvertencias() == null || fisher.getAdvertencias().size() < 3;
        }
        return false;
    }

    @PostMapping
    public ResponseEntity<Object> createShip(@RequestBody ShipDTO shipDTO) {
        Ship ship = shipMapper.toEntity(shipDTO, null);
        if (shipDTO.ownerFisherId() != null) {
            if(isFisherAssignedAsOwner(shipDTO.ownerFisherId()) || isFisherAssignedAsPartner(shipDTO.ownerFisherId())) {
                return ResponseEntity.badRequest().body("O pescador dono já está associado a um barco.");
            }
            Optional<Fisher> ownerFisherOptional = fisherRepository.findById(shipDTO.ownerFisherId());
            if (ownerFisherOptional.isPresent()) {
                ship.setOwnerFisher(ownerFisherOptional.get());
            } else {
                return ResponseEntity.badRequest().body("Pescador dono não encontrado.");
            }
            if (!isFisherEligible(shipDTO.ownerFisherId())) {
                return ResponseEntity.badRequest().body("O pescador dono possui muitas advertências e não pode ser associado a um barco.");
            }
        }

        if (shipDTO.partnerFisherId() != null) {
            if(isFisherAssignedAsOwner(shipDTO.partnerFisherId()) || isFisherAssignedAsPartner(shipDTO.partnerFisherId())) {
                return ResponseEntity.badRequest().body("O pescador parceiro já está associado a um barco.");
            }
            Optional<Fisher> partnerFisherOptional = fisherRepository.findById(shipDTO.partnerFisherId());
            if (partnerFisherOptional.isPresent()) {
                ship.setPartnerFisher(partnerFisherOptional.get());
            } else {
                return ResponseEntity.badRequest().body("Pescador parceiro não encontrado.");
            }
            if (!isFisherEligible(shipDTO.partnerFisherId())) {
                return ResponseEntity.badRequest().body("O pescador parceiro possui muitas advertências e não pode ser associado a um barco.");
            }
        }
        Ship savedShip = shipRepository.save(ship);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipMapper.toDTO(savedShip));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateShip(@PathVariable Long id, @RequestBody ShipDTO shipDTO) {
        Optional<Ship> shipOptional = shipRepository.findById(id);
        if (shipOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Ship existingShip = shipOptional.get();
        shipMapper.toEntity(shipDTO, existingShip); // Popula os detalhes atualizados
        if (shipDTO.ownerFisherId() != null) {
            Long existingOwnerId = (existingShip.getOwnerFisher() != null) ? existingShip.getOwnerFisher().getId() : null;
            if ((existingOwnerId == null || !shipDTO.ownerFisherId().equals(existingOwnerId))
                    && (isFisherAssignedAsOwner(shipDTO.ownerFisherId())
                    || isFisherAssignedAsPartner(shipDTO.ownerFisherId()))) {
                return ResponseEntity.badRequest().body("O pescador dono já está associado com um barco.");
            }
            if (!isFisherEligible(shipDTO.ownerFisherId())) {
                return ResponseEntity.badRequest().body("O pescador dono possui muitas advertências e não pode ser associado a um barco.");
            }
            Optional<Fisher> ownerFisherOptional = fisherRepository.findById(shipDTO.ownerFisherId());
            ownerFisherOptional.ifPresent(existingShip::setOwnerFisher);
        }

        if (shipDTO.partnerFisherId() != null) {
            Long existingPartnerId = (existingShip.getPartnerFisher() != null) ? existingShip.getPartnerFisher().getId() : null;
            if ((existingPartnerId == null || !shipDTO.partnerFisherId().equals(existingPartnerId))
                    && (isFisherAssignedAsPartner(shipDTO.partnerFisherId())
                    || isFisherAssignedAsOwner(shipDTO.partnerFisherId()))) {
                return ResponseEntity.badRequest().body("O pescador parceiro já está associado com um barco.");
            }
            if (!isFisherEligible(shipDTO.partnerFisherId())) {
                return ResponseEntity.badRequest().body("O pescador parceiro possui muitas advertências e não pode ser associado a um barco.");
            }
            Optional<Fisher> partnerFisherOptional = fisherRepository.findById(shipDTO.partnerFisherId());
            partnerFisherOptional.ifPresent(existingShip::setPartnerFisher);
        }
        Ship updatedShip = shipRepository.save(existingShip);
        return ResponseEntity.ok(shipMapper.toDTO(updatedShip));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShip(@PathVariable Long id) {
        if (!shipRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        // Desassociar o Ship de todos os registros Expedition que o referenciam
        List<Expedition> expeditions = expeditionRepository.findByShipId(id);
        for (Expedition expedition : expeditions) {
            expedition.setShip(null);
            expeditionRepository.save(expedition);
        }
        shipRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
